# DevBites – Technical Overview

A personal technical blog built with Astro (AstroPaper base) focused on deep-dive engineering topics: .NET, Azure, distributed systems, reliability, performance, and real-world problem solving.

## Stack
- Framework: Astro + TypeScript
- Styling: TailwindCSS (utility-first; no custom global BEM abstractions)
- Content: Markdown with frontmatter parsed via `astro:content` collections (`src/content.config.ts`)
- Build Output: Static site → `dist/`
- Deployment: GitHub Pages (workflow: `.github/workflows/ci.yml`)
- OG Image Generation: `src/pages/og.png.ts` + templates under `src/utils/og-templates/`

## Project Structure
```
src/
  components/         # Reusable UI (.astro)
  layouts/            # Layout shells (Main, PostDetails, etc.)
  pages/              # Routes (pagination & slug for posts)
  data/blog/          # Markdown content (year folders allowed)
  utils/              # Helpers: filtering, sorting, slug, OG, font
  assets/             # Icons + images (non-public processed assets)
public/               # Static assets served as-is
astro.config.ts       # Astro configuration
src/config.ts         # Site-level config (title, pagination, etc.)
src/constants.ts      # Socials, icon imports, constants
src/content.config.ts # Content collection schema
```

## Content Model (Frontmatter)
Common fields:
```
title: string
description: string
pubDatetime: ISO timestamp
modDatetime: ISO timestamp | null
author: string
featured: boolean
tags: string[]
draft: boolean (optional)
```
Additional custom fields can be added by extending the schema in `src/content.config.ts`.

## Posts & Routing
- Listing (paginated): `src/pages/posts/[...page].astro` (uses `SITE.postPerPage` from `src/config.ts`).
- Detail pages: `src/pages/posts/[...slug]/index.astro` (slug computed via `getPath`).
- Tags index: `src/pages/tags/index.astro` & dynamic tag routes under `src/pages/tags/[tag]/`.
- Archives: `src/pages/archives/`.

## Key Utilities
- `getSortedPosts.ts`: Ordering logic (usually date descending).
- `postFilter.ts`: Filtering (e.g., draft exclusion, tag filtering).
- `generateOgImages.ts`: Runtime OG image generation support.
- `slugify.ts`: Consistent slug casing.
- `getPostsByTag.ts`, `getUniqueTags.ts`: Tag operations.

## Development Workflow
```bash
pnpm install          # Install dependencies
pnpm run dev          # Start dev server (default: http://localhost:4321)
pnpm run build        # Build static site to dist/
pnpm run preview      # Preview production build
pnpm run lint         # ESLint
pnpm run format       # Prettier formatting
pnpm run sync         # Astro TS types generation
```

## Deployment (CI/CD)
GitHub Actions workflow (`ci.yml`):
1. Install deps (pnpm)
2. Lint & format check
3. Build
4. Deploy to GitHub Pages (Pages environment)

## OG Images
- Page-level metadata (frontmatter `title` + `description`) feeds OG generation.
- Custom logic lives in `src/pages/og.png.ts` and templates under `src/utils/og-templates/`.

## Extending
- Add global site fields: update `src/config.ts`.
- Add frontmatter fields: extend schema in `src/content.config.ts`.
- New UI blocks: place in `src/components/` (prefer composition over monolithic components).
- Add search or other data features: create util modules under `src/utils/`.

## Conventions
- Commit style: Conventional Commits (e.g., `feat: add rate limiter article`).
- Keep posts atomic: one core topic per file.
- Optimize images; place heavy static assets under `public/`.
- Avoid over-abstraction until patterns repeat (pragmatic scaling).

## Observability & Quality (Content Angle)
When writing technical articles, prefer:
- Root cause narratives (symptom → diagnosis → fix → hardening)
- Failure modes (timeouts, contention, retries, partitioning issues)
- Operational notes (monitoring, metrics, tracing) where relevant

## License
See `LICENSE` for reuse terms. Blog content may be adapted—credit appreciated.

---
Focused. Practical. Durable engineering knowledge.
