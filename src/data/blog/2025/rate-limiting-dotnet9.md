---
author: Simon B.
pubDatetime: 2025-09-20T15:00:00.000-04:00
modDatetime: 
title: How to Use Rate Limiting in .NET 9 APIs
featured: true
tags:
  - dotnet
  - api
  - rate-limiting
description: Learn how to implement rate limiting in your .NET 9 Web API using built-in middleware and C# code examples.
abstract: This article demonstrates practical rate limiting in .NET 9 APIs, including code samples and configuration tips.
synopsis: Step-by-step guide to adding rate limiting to your .NET 9 Web API endpoints with C#.
---

## Table of Content

Rate limiting is essential for protecting your API from abuse and ensuring fair usage. .NET 9 introduces built-in support for rate limiting via middleware, making it easier than ever to add this feature to your Web APIs.

## Getting Started

First, add the required NuGet package (if not already included):

```bash
 dotnet add package Microsoft.AspNetCore.RateLimiting
```

## Basic Configuration

In your `Program.cs`, configure the rate limiting middleware:

```csharp
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("fixed", limiterOptions =>
    {
        limiterOptions.PermitLimit = 5;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 2;
    });
});

var app = builder.Build();

app.UseRateLimiter();

app.MapGet("/weather", () => "Weather data")
    .RequireRateLimiting("fixed");

app.Run();
```

## Explanation
- `PermitLimit`: Number of allowed requests per window.
- `Window`: Time window for rate limiting.
- `QueueLimit`: Number of requests to queue when limit is reached.
- `RequireRateLimiting`: Applies the limiter to specific endpoints.

## Conclusion

With just a few lines of code, you can add robust rate limiting to your .NET 9 APIs. This helps prevent abuse and ensures your service remains reliable for all users.
