---
applyTo: "src/data/blog/**/*.md"
---

# Blog Authoring Instructions

Purpose: Ensure consistent, high-quality technical articles for DevBites (home page features, About page narrative, deep-dive posts). These instructions guide AI + human authors.

## Audience & Voice
- Experienced engineers / architects (.NET, Azure, distributed systems).
- Tone: direct, pragmatic, authoritative without arrogance.
- Avoid fluff, marketing speak, and unexplained buzzwords.

## Core Content Pattern
Each post should follow (explicitly or implicitly):
1. Context (what system / scenario?)
2. Problem (symptom, constraints, impact)
3. Diagnosis (how it was understood: logs, metrics, traces, experiments)
4. Solution (implementation details, code, architecture sketch)
5. Failure Modes & Trade-offs
6. Hardening / Observability (metrics, alerts, future-proofing)
7. Key Takeaways (3–5 bullets)

## Frontmatter Requirements
Required: `title`, `description`, `pubDatetime`, `author`, `tags`.
Optional: `modDatetime`, `featured`, `draft`.
Rules:
- `title`: Actionable / insight-driven (avoid clickbait; be specific: "Reducing gRPC Latency with Connection Reuse" > "Improve Performance").
- `description`: ≤160 chars. Must describe outcome or value.
- `tags`: 3–7; prefer domain + technique (e.g., `dotnet`, `azure`, `observability`, `resiliency`).
- `modDatetime`: Set when materially updated (breaking changes, improved approach, perf gains >10%).
- `featured: true` only for cornerstone / reference pieces.

## Markdown Conventions
- Use fenced code blocks with explicit language labels: `csharp`, `bash`, `json`, `yaml`, `mermaid` (if diagrams added later).
- Wrap long lines (>120 char) logically at sentence / clause boundaries.
- Use ordered lists for sequences, unordered for conceptual groupings.
- Use callouts via blockquotes for warnings / insights:
  > Performance note: Avoid allocating per-request serializers.
- Avoid inline HTML unless necessary.

## C# Code Style
- Target modern .NET (8/9 features as applicable).
- Minimal hosting model examples.
- Prefer `async` APIs; avoid `Result` blocking.
- Use DI pattern for examples when showing extensibility.
- Show configuration-bound options with `IOptions<T>` only if relevant.
- Keep examples ≤50 lines; split sections if longer.

## Example Frontmatter
```yaml
---
title: Taming Backpressure in Azure Service Bus Consumers
description: How we eliminated cascading latency by adding bounded channels and adaptive prefetch in .NET.
pubDatetime: 2025-09-18T10:05:00-04:00
author: Simon B.
tags:
  - dotnet
  - azure
  - messaging
  - performance
featured: true
---
```

## About Page Guidance
- Focus on durability, systems thinking, reliability mindset.
- Highlight domains: actor models, async messaging, IoT scale, resilience engineering.
- Keep 2–3 paragraphs; link to cornerstone posts.

## Home Page Featured Strategy
- Up to 6 featured posts: choose variety (architecture, debugging win, performance, reliability pattern, tooling improvement, postmortem).
- Rotate occasionally; keep at least 2 evergreen references.

## Tagging Strategy
- Prefer canonical forms: `dotnet` (not `csharp` unless language-specific), `azure`, `observability`, `resiliency`, `kubernetes`, `performance`, `security`, `testing`.
- Avoid hyper-specific one-off tags unless likely to recur.

## Quality Checklist (Before Publish)
- All code blocks compile or are plausibly correct.
- Problem statement is concrete (quantified where possible: latency from 750ms → 140ms p95).
- Trade-offs explicitly stated.
- Takeaways present.
- Frontmatter validated against schema.

## When Updating Existing Posts
- Add `modDatetime`.
- Append a short "Update (YYYY-MM-DD):" note near top summarizing change.
- Preserve historical context unless inaccurate.

## Prohibited
- Placeholder lorem ipsum (replace with authentic narrative).
- Fabricated benchmarks without methodology.
- Sensitive/internal proprietary info.

## OG & Share Preview
- Ensure `title` + `description` stand alone out of context (social share cards).
- Avoid leading with "How to" unless truly instructional; prefer result framing when analytical.

---
When in doubt: prioritize clarity, real operational insight, and durable engineering value.
