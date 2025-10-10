---
applyTo: "src/pages/about.md"
---

# About Page Authoring Instructions

Purpose: Maintain a concise, authentic About page reflecting senior engineering expertise (cloud-scale .NET / Azure systems) while remaining approachable.

## Voice & Tone
- Confident, pragmatic, engineering-first.
- Avoid hype; prefer concrete domain signals (e.g., actor model, distributed messaging, resilience patterns).
- Balanced humanity: seriousness in craft + light collaborative spirit.

## Core Narrative Pillars (Keep all 3)
1. Durable Systems: Large-scale, resilient, distributed architecture (Azure, .NET, messaging, IoT, NoSQL, Kubernetes, IaC).
2. Engineering Craft & Team Strength: Getting it right the first time; strengthening every link; trusted wingman archetype.
3. Culture & Mindset: Reliability + clarity + enjoyment; “serious work, relaxed people.”

## Required Sections
1. Opening Hook (1–2 sentences): Present mission or core architectural focus.
2. What I Build: Bulleted or short paragraph listing domains (IoT scale ingestion, event-driven systems, actor-based workloads, auth flows, multi-region failover, cost-aware reliability).
3. How I Work: Emphasize correctness-first design, observability, iterative hardening, collaborative patterns.
4. Philosophy / Mindset: Blend of rigor + levity; team empowerment; operational excellence.
5. Call-to-Action (optional): Invite readers to explore cornerstone posts or connect (LinkedIn / GitHub).

## Style Guidelines
- Length target: 250–400 words.
- Use present tense for ongoing capabilities; past tense only for specific achievements if added later.
- Prefer active verbs: design, evolve, harden, instrument, partition, optimize.
- Avoid generic claims (e.g., “passionate about technology”). Replace with domain specifics.
- No marketing filler, no exaggerated adjectives (“world-class”, “cutting-edge”).

## Technical Signal Lexicon (sprinkle, don’t overload)
Azure, .NET Core, C#, actor model, messaging bus (Service Bus / Kafka style), idempotency, backpressure, partitioning, observability, OAuth/OIDC, IaC (Bicep/Terraform), Kubernetes, failover, multi-tenant isolation, SLA/SLO.

## Anti-Patterns (Do Not Include)
- List of unrelated buzzwords.
- Overly personal biography (keep focused on engineering identity).
- Salary / job-seeking language (unless explicitly repurposed later).

## Example Skeleton (Editable)
"I design and evolve resilient cloud systems on Azure with .NET—platforms that ingest, route, and process data reliably at scale. From IoT event streams to actor-pattern workloads, I focus on architectures that keep delivering when traffic spikes, regions fail, or dependencies degrade."

"I like getting things right early: modeling concurrency boundaries, shaping contracts, instrumenting telemetry before incidents, and building in graceful failure modes. I partner closely with teams—acting as a systems architect, deep-dive troubleshooter, and steady wingman who prevents silent risk." 

"Reliability and clarity matter—so does enjoying the craft. The best software comes from teams that combine rigor with a bit of levity. Serious engineering; relaxed people."

CTA (optional): "If you’re interested in how I approach rate limiting, multi-region failover, or resilient message consumption, check the featured posts."

## Maintenance Triggers
- Update when expanding domain scope (e.g., adding AI workload reliability, edge compute, streaming optimization).
- Add `modDatetime` to about page frontmatter if structural meaning changes.

---
When generating or updating, ensure the three narrative pillars remain intact.