# Global Copilot Instructions

Purpose: Technical guidance for automation & AI assistants working on this codebase. (Authoring-specific markdown rules live in `./instructions/blog.instructions.md`).

## Stack & Build
- Framework: Astro + TypeScript + TailwindCSS.
- Content via `astro:content` collections (`src/content.config.ts`).
- Dev: `pnpm install` → `pnpm run dev` (port 4321).
- Build: `pnpm run build` (output `dist/`), preview: `pnpm run preview`.
- Lint/Format: `pnpm run lint`, `pnpm run format`.
- CI: `.github/workflows/ci.yml` builds & deploys to GitHub Pages.

## Key Paths
- Config: `astro.config.ts`, `src/config.ts`, `src/constants.ts`, `src/content.config.ts`.
- Posts: `src/data/blog/**`.
- Routing: `src/pages/posts/[...page].astro` (pagination), `src/pages/posts/[...slug]/index.astro` (detail), tag & archive pages under `src/pages/tags/`, `src/pages/archives/`.
- Layouts: `src/layouts/` (e.g., `PostDetails.astro`, `Main.astro`).
- Components: `src/components/`.
- Utilities: `src/utils/` (sorting, filtering, slug generation, OG image logic).
- OG Image generation: `src/pages/og.png.ts` + `src/utils/og-templates/`.

## Conventions
- Conventional Commits (`feat:`, `fix:`, `chore:`, etc.).
- Avoid introducing new styling systems—stay within Tailwind & existing component abstractions.
- Frontmatter fields validated via schema in `src/content.config.ts`; extend there before using new keys.
- Keep functions small & pure in `src/utils/`; SSR-specific logic stays in page/layout `.astro` files.

## Performance & Reliability Focus
- Defer heavy computation to build time where possible (static generation).
- Only add client-side JS when needed (prefer server-rendered + static hydration).
- Optimize image additions (use appropriate format; large assets into `public/`).

## Adding Features
- Site-wide config knobs → `src/config.ts`.
- New derived data (e.g., taxonomy, search indices) → utility module + invoked in page `getStaticPaths` or top-level script section.
- Reuse pagination & sorting utilities; don't duplicate logic.

## Testing & Validation (Lightweight)
- Run `pnpm run build` after structural changes (ensures content collection types are correct).
- If schema changed: run `pnpm run sync` to refresh TS types.

## Do / Avoid
Do:
- Reference existing utilities before writing new ones.
- Keep authoring logic out of global instructions (belongs in blog instructions file).
Avoid:
- Adding runtime dependencies for simple transformations.
- Hardcoding absolute URLs; use values from `src/config.ts` where available.

## Escalation
If an instruction is ambiguous: implement the most common-sense, minimal-change solution and document assumption in PR description.

See authoring guidance: `./instructions/blog.instructions.md` for content/redaction rules.
