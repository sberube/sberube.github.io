---
author: Simon B.
pubDatetime: 2025-09-20T15:00:00.000-04:00
modDatetime: 
title: Practical Rate Limiting in .NET 9 (Fixed & Beyond)
featured: false
tags:
  - dotnet
  - webapi
  - resiliency
  - rate-limiting
description: Implement fixed and per-partition rate limiting in .NET 9 with rejection handling, observability, and trade-offs.
---

Rate limiting protects shared resources, constrains abusive or buggy clients, and smooths burst traffic. .NET 9 ships mature middleware abstractions over multiple limiter strategies so you can enforce fairness without building custom throttling infrastructure.

> Goal: Demonstrate a production-leaning baseline you can extend—NOT just a “hello world” limiter.

## 1. Context
Imagine a public JSON endpoint receiving unpredictable client bursts. Downstream dependencies (DB, external APIs) show rising p95 latency and thread-pool starvation during spikes. We need a protective layer that is simple, observable, and composable with future policies (auth quotas, per-customer tiers).

## 2. Problem Statement
Without controls: bursts (e.g., 200 reqs in <5s) cause queueing, GC pressure, and elevated error rates. We need:
- A global cap to prevent total saturation.
- A per-client limiter to isolate a noisy tenant.
- Predictable rejection behavior (structured response + Retry-After hint).

## 3. Fixed Window Baseline
Add the fixed window limiter for a quick protective envelope.

Install the package (if not already present):

```bash
dotnet add package Microsoft.AspNetCore.RateLimiting
```

## 4. Basic Configuration (Fixed Window)
`Program.cs` minimal example:

```csharp
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("fixed", o =>
    {
        o.PermitLimit = 60;                // 60 requests
        o.Window = TimeSpan.FromMinutes(1); // per 1 minute window
        o.QueueLimit = 10;                  // allow short overflow buffering
        o.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });
});

var app = builder.Build();

app.UseRateLimiter(); // Apply globally

app.MapGet("/status", () => Results.Ok(new { ok = true }))
   .RequireRateLimiting("fixed");

app.Run();
```

### Explanation
- `PermitLimit` – allowed requests per window.
- `Window` – duration of the fixed bucket.
- `QueueLimit` – temporary overflow buffering before rejection.
- `RequireRateLimiting` – opt-in at endpoint (or rely on global if set earlier).

## 5. Adding Per-Client (Partitioned) Limits
Often one noisy client harms others. Use a partitioned limiter keyed by API key or IP.

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("global", o =>
    {
        o.PermitLimit = 500;
        o.Window = TimeSpan.FromMinutes(1);
        o.QueueLimit = 50;
    });

    options.AddPartitionedLimiter("per-client", httpContext =>
    {
        var clientKey = httpContext.Request.Headers["X-Api-Key"].FirstOrDefault()
                        ?? httpContext.Connection.RemoteIpAddress?.ToString()
                        ?? "anonymous";

        return RateLimitPartition.GetFixedWindowLimiter(clientKey, _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 30,
            Window = TimeSpan.FromMinutes(1),
            QueueLimit = 5,
            QueueProcessingOrder = QueueProcessingOrder.OldestFirst
        });
    });

    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.OnRejected = (context, ct) =>
    {
        context.HttpContext.Response.Headers["Retry-After"] = "10"; // seconds hint
        return context.HttpContext.Response.WriteAsJsonAsync(new
        {
            error = "rate_limit_exceeded",
            limiter = context.Lease.TryGetMetadata(MetadataName.LimiterName, out var n) ? n : null,
            detail = "Request limit exceeded. Try again soon."
        }, ct);
    };
});

app.MapGet("/data", () => "some data")
   .RequireRateLimiting("global")
   .RequireRateLimiting("per-client");
```

## 6. Strategy Comparison (When to Switch)
| Strategy | Good For | Limitation |
|----------|----------|------------|
| Fixed Window | Simplicity, coarse fairness | Edge-of-window bursts |
| Sliding Window | Smoother enforcement | More bookkeeping |
| Token Bucket | Bursty traffic with refill | Harder to reason about steady rate |
| Concurrency | Limiting simultaneous work | Doesn't cap total request count |

## 7. Failure Modes & Trade-offs
- High queue limits → latency amplification (head-of-line blocking).
- Global-only limiter → a single tenant can consume allocation each window.
- Partitioned limiter with untrusted keys → cardinality explosion (sanitize / bucket unknowns).
- Rejection storm → ensure clients back off (expose `Retry-After`).

## 8. Observability & Metrics
Capture:
- Rejections count (tagged by limiter name + partition key).
- Average queue wait time.
- Lease acquisition failures over time (sudden spikes may indicate abuse).
Log *once* per state change, not every rejection.

## 9. Hardening Extensions
- Layer with auth tiers: different limits per subscription level.
- Combine with circuit breakers downstream to avoid cascading failures.
- Emit Prometheus counters (e.g., `rate_limit_rejections_total{limiter="per-client"}`).

## 10. Key Takeaways
- Start with a simple global fixed window; add partitioning when noisy neighbors appear.
- Always expose consistent 429 shape + `Retry-After` header.
- Monitor rejection rate vs success rate; tune before production incidents.
- Queue length > small single digits often signals architectural backpressure needs (consider asynchronous ingestion).

## 11. Next Steps
Explore sliding window or token bucket for smoother distribution, and integrate client-specific budgets tied to billing or plan level.