# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Ground rules

- **Language**: All code, comments, JSDoc, documentation, and user-visible copy must be written in
  **English**.
- **Package manager**: Use **npm** for all scripts and dependency installation. Never pnpm or yarn.
- **Git**: `main` is the deployed branch (Vercel). Do not commit or push unless the user asks; when
  they do, work on a task branch off `main` rather than committing to it directly.
- **TypeScript**: the repo is fully strict TypeScript (migrated 2026-07-26). No `.js`/`.jsx` under
  `src/` — never add one. `typescript` is pinned to `^5` and `eslint` to `^9` for compatibility reasons
  documented in `.claude/agents/platform.md`; do not bump them casually. Toolchain changes belong to
  the `platform` agent.
- **Documentation is part of the deliverable**: `README.md`, `CLAUDE.md`, `DESIGN.md` and `PRODUCT.md`
  must be true at all times. Any change that invalidates a statement in one of them fixes it in the
  **same** change, never as a follow-up. **One fact, one file**: each document owns its subject and the
  others link to it instead of repeating it — README the project and its stack, this file how to work in
  the repo, `DESIGN.md` the visual system, `PRODUCT.md` the product truth. A fact written in two places is
  a bug; delete the copy and leave a pointer. See `.claude/rules/docs-maintenance.md` for the ownership
  table, the trigger table, and the reporting format.
- **UI components**: shadcn/ui **is initialized and in use** — `components.json` at the repo root
  (style `new-york`, base color `neutral`, CSS variables, `lucide` icons, css
  `src/styles/globals.css`). `src/components/ui/` holds `button`, `card`, `badge`, `input`, `textarea`,
  `label`, `sheet`, `tooltip`, `toggle`, `toggle-group`, `separator`; they import from the unified
  **`radix-ui`** package. Source any further primitive from the `@shadcn` registry via the shadcn MCP
  tools and `npx shadcn@latest add` — never hand-write a primitive the registry ships, and never paste
  registry source by hand. Magic UI (`magicuidesign-mcp`) only when the user explicitly asks — the repo
  currently holds six such components in `src/components/ui/`: `animated-theme-toggler` (the nav
  theme switch), `shine-border` (the contact form card), `border-beam` (the hero "Download CV"
  button), `particles` (the hero and footer background field), `orbiting-circles` (the skills
  section's orbital system) and `lens` (the magnifier over each project card's screenshot), each
  installed from `https://magicui.design/r/<name>.json`. Magic UI ships the first three and `lens`
  importing `motion/react`; the import is deliberately re-pointed to `framer-motion` so the repo carries
  one animation runtime, which means `shadcn diff` reports a mismatch on them. `lens` diverges twice
  more: upstream's focusable `role="region"` wrapper is dropped, because the effect is pointer-only and
  a tab stop per card that does nothing is an accessibility regression, and its `rounded-xl` default is
  dropped so the consumer owns the shape. `particles` needs no
  animation library and is kept as upstream source apart from React-correctness fixes; it is the **one
  sanctioned exception to the no-raw-colour rule**, because it paints a `<canvas>` where a token class
  cannot reach — its `color` prop takes a hex literal, supplied by `useParticleColor()` in
  `src/lib/particle-color.ts`, which is `--foreground` converted to hex and is the only place those two
  literals may live. Do not generalise that exception to anything a token can style — `orbiting-circles`
  paints its ring as an SVG `stroke`, so it takes `stroke-border` and needs no exception. That component
  also renames upstream's `--duration`/`--radius` to `--orbit-duration`/`--orbit-radius`, because
  `--radius` is the shape token and a unitless override would break `rounded-*` on its children. Every
  installed component must then be reconciled with the design system and this repo's code conventions
  (arrow functions, bottom `export default`, one palette) — see `.claude/agents/frontend.md`.
- **The shadcn MCP is the way in for all component work** — not just installing. Adding, replacing,
  restyling, or debugging a primitive starts with `mcp__shadcn__search_items_in_registries` /
  `view_items_in_registries` / `get_item_examples_from_registries`, and installs run through the command
  from `get_add_command_for_items`. `npx shadcn@latest info | search | view | docs <component> | diff`
  are the CLI equivalents. Do not answer a component question from memory — the registry is the source
  of truth. The project-level `shadcn` skill lives in `.agents/skills/shadcn` (installed with
  `npx skills add shadcn/ui`, symlinked into `.claude/skills/`) and auto-activates for shadcn work.
  `skills-lock.json` is that installer's manifest — use `npx skills update|remove` rather than editing
  `.agents/` by hand. The bundled `migrate-radix-to-base` skill was removed: this project stays on Radix.

## Self-verifying loop (mandatory for UI/behavior work)

Any task that changes what a visitor sees or how the site behaves MUST go through a
build → verify → correct loop before it is reported as done. The loop is orchestrated in the main
conversation (subagents cannot spawn subagents), using the three specialized agents.

1. **Define acceptance criteria first.** Restate the task as a short list of observable, checkable
   outcomes (e.g. "the projects grid renders 3 columns at 1280px and 1 column at 360px, and the
   category filter narrows the visible cards"). If the task does not already imply clear criteria, ask the user
   one focused question before building — the loop cannot judge PASS/FAIL without them.
2. **Ensure the site is running.** The `verifier` needs the dev server at `http://localhost:3000`.
   Start it in the background if it is not up and confirm it responds before delegating verification.
3. **Build.** Delegate the implementation to `frontend` and/or `platform` per
   `.claude/rules/agent-delegation.md`.
4. **Verify.** Delegate to the `verifier` agent (`.claude/agents/verifier.md`), passing the exact
   acceptance criteria. It drives Chrome via the chrome-devtools MCP and returns a structured
   `VERDICT: PASS | FAIL | BLOCKED`. Beyond the given criteria the verifier ALWAYS checks: both themes
   (light **and** dark), responsiveness with no horizontal overflow at 360/768/1280, a clean console,
   no failed asset requests, and no placeholder text on screen — a break in any of those is a FAIL even
   when it was not part of the task.
5. **Correct and repeat.** On `FAIL`, feed the verifier's `FIX_HINTS` back to the relevant builder
   agent and re-verify. Loop until `PASS` or a **maximum of 3 build→verify iterations**.
6. **Sync the docs.** Before reporting done, check the change against the four root documents and fix
   whatever it made false, in the owning file only (`.claude/rules/docs-maintenance.md`). A visual change
   almost always means `DESIGN.md` and nothing else; if you find yourself about to write the same design
   fact into README or this file, that is the duplication the ownership table exists to prevent. A builder
   agent that returned `Docs: no change needed` is not a substitute for your own check — you see the whole
   change, it saw only its slice.
7. **Stop honestly.** If still failing after 3 iterations, or on `BLOCKED`, stop and report the last
   verdict plainly — never claim success the verifier did not confirm.

Prerequisite: the chrome-devtools MCP server must be connected. If it is not, report `BLOCKED` rather
than skipping verification silently. No credentials are needed — the site has no auth.

Skip the loop only for changes with no runtime surface (docs, config with no visual effect, dependency
bookkeeping). When in doubt, verify.

## Commands

```bash
npm run dev            # next dev on http://localhost:3000
npm run build          # production build — also type-checks
npm run start          # serve the production build

npm run lint           # eslint (flat config) — the authoritative style config
npm run lint:fix       # runs automatically after every edit via a PostToolUse hook
npm run typecheck      # tsc --noEmit

npm run design:sync    # regenerate DESIGN.md frontmatter + .impeccable/design.json from globals.css
npm run design:check   # fail if that generated layer is stale (read-only)
```

`design:sync` is wired to run automatically two ways, because neither covers the other's gap. A
`PostToolUse` hook in `.claude/settings.json` runs it after an `Edit`/`Write` touching `globals.css` or
`DESIGN.md` — so it only sees edits made through Claude Code's tools, never the user's own editor.
`.githooks/pre-commit` runs `design:check` and blocks a drifted commit regardless of who edited; it needs
`git config core.hooksPath .githooks` once per clone (documented in README § Getting Started) or it
silently never runs.

**Do not run `npm run build` while a `next dev` server is live on this tree.** Both write to `.next`,
and the production artifacts clobber the dev manifests — the running server then answers every request
with a bare `Internal Server Error` until it is restarted. Use `npm run typecheck` for a quick check
while the dev server is up, and build only when it is stopped (or from a separate checkout).

## Architecture

### Purpose

Personal portfolio site of Stanislav Krivtsoff, frontend developer in Paris. Deployed on Vercel at
[krivtsoff.online](https://krivtsoff.online). Its job is to demonstrate its author's craft, so visual
quality is the product, not decoration.

### Shape

A **single route**. `src/app/page.tsx` renders the sections in order: `NavBar`, `Banner`,
`SkillsAndTech`, `Experience`, `Projects`, `Contact`, `Footer`, then `ScrollToTop` — a fixed control
outside the section flow, which reveals itself from an `IntersectionObserver` on the hero.
`src/app/layout.tsx` owns the font
(Montserrat via `next/font`), the `next-themes` provider (class strategy, `defaultTheme="dark"`), site
metadata/OpenGraph, and Vercel Analytics. `NavBar.tsx` owns the sticky nav, the mobile drawer (a shadcn
`Sheet`, so Radix handles focus trapping and scroll locking), and the theme toggle (Magic UI's
`AnimatedThemeToggler`, driven in controlled mode from `useTheme()` so `next-themes` keeps sole
ownership of persistence, styled with `buttonVariants`); there is no
scroll-spy. The styling stack is Tailwind + Radix only — MUI and Bootstrap were removed on 2026-07-26
along with the dead `MenuDrawer`/`ThemeToggler` components. `src/app/page.tsx` is a server component;
each section carries its own `'use client'`.

Content data and its exported types live in `src/constants/{experiences,projects,technologies}.ts`;
per-component render data sits next to its consumer (`src/components/banner-content.ts`); images and
the CV PDF in `public/`.

There is **no** auth, database, upstream API, middleware, i18n, or API route handler. The only network
call is a client-side EmailJS send from `src/components/Contact.tsx`. Do not introduce any of those
without asking.

### Styling

Tailwind CSS 4, CSS-first: there is **no** `tailwind.config.ts`. Everything lives in
`src/styles/globals.css`, which is the **single source of truth for every token value**.

**`DESIGN.md` owns the design system** — colour roles, typography, layout and breakpoints, elevation,
shapes, component specs, and the named rules that govern them. Read it before any visual work and do not
restate it here; per `.claude/rules/docs-maintenance.md` a design fact written twice is a bug. What
follows is only the mechanical set — the things that silently break the build or the theme if you get
them wrong.

- **Adding a token**: declare the variable in `:root`, and in `.dark` unless it is deliberately
  theme-constant, then map it in `@theme inline`. Then run `npm run design:sync` so `DESIGN.md`'s
  frontmatter and `.impeccable/design.json` follow. Never hand-edit that generated frontmatter.
- **`@theme inline` is load-bearing, not stylistic.** `inline` makes the utility inline the `var()`
  instead of freezing a value, which is the only reason a token can resolve differently inside `.dark`.
  The elevation and colour mappings depend on it, as does `--animate-shine`, whose `var(--duration)`
  must resolve against the element the utility sits on rather than `:root`.
- **Elevation is `shadow-ambient` / `shadow-raised` / `shadow-overlay`.** Tailwind's stock
  `shadow-xs`…`shadow-2xl` are theme-blind and vanish on graphite — do not use them here.
- **Tailwind only compiles class names it can read as literal text.** A runtime-built class
  (`` `text-[${item.color}]` ``, `'text-' + tone`) type-checks, lints, and emits no CSS at all. Per-item
  colours go in the data as complete token class names.
- **No arbitrary colour values** — no hex, no `rgb()`, no `bg-[#…]`, no inline `style={{ color }}`.
  Opacity modifiers on tokens (`bg-primary/10`, `bg-muted/30`) are the sanctioned way to lighten one.
- **Content detection is explicit on purpose**: `@import 'tailwindcss' source(none)` plus
  `@source '../../src'`. Tailwind 4 otherwise scans the whole repo except `node_modules` and gitignored
  files, which compiled the utility names quoted as prose in `.agents/skills/**` and `.claude/agents/*.md`
  — including the "never do this" examples — into the bundle for real. An `@source not` exclusion per
  offending directory was the earlier approach and kept missing new ones.
- **No hand-written legacy classes.** `.gradient-text`, `.glass-effect`, `.button-primary`,
  `.button-secondary`, `.container-custom` and `.card-hover` were deleted on 2026-07-26. Containers are
  `mx-auto max-w-7xl`, buttons are `Button` variants, panels are `Card`.
- The rest of `globals.css`: `@import 'tw-animate-css'`,
  `@custom-variant dark (&:is(.dark *))` (keyed to the `next-themes` class strategy), a `@theme` block
  for the `float` animation, the `@layer base` reset, `html { scroll-behavior: smooth;
  scroll-padding-top: 4rem }` — the padding is what stops an anchor jump from parking a heading under the
  fixed nav — the scrollbar rules, and the three
  `::view-transition-*(root)` rules the theme toggler's clip-path reveal needs — the two scoped ones read
  `--magicui-theme-toggle-vt-duration` / `--magicui-theme-vt-clip-from`, which the toggler sets on
  `<html>` only while a toggle is in flight, so no other view transition is affected.

The other root documents: `PRODUCT.md` owns product truth (audience, positioning, protected facts) and
wins on product and voice decisions; `DESIGN.md` wins on visual ones. See also
`.claude/agents/frontend.md` and `.claude/rules/code-organization.md`.

### Environment variables

Every key is `NEXT_PUBLIC_*` and therefore public by design (inlined into the client bundle): the
contact location, social/messenger links, the CV download URL, and the EmailJS service/template/user
IDs. `README.md` documents the full list. Nothing secret may be added under that prefix.

`.env.local` also carries `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_CONTACT_PHONE`, which **no code
reads** — they stopped being used in commit `ddc13b9`, long before the TypeScript and shadcn work. The
contact section renders Location plus the messenger links. Either wire them back in or drop them from
`.env.local`; do not treat their presence as proof the site displays an email or a phone number.

## Code conventions

- `@/` maps to `src/` — always use the alias.
- **Arrow function syntax** for all components and functions, assigned to a `const`; the file's primary
  component is exported at the bottom via `export default` and imported as a default import. This holds
  for `src/components/ui/` too: registry output uses `function` declarations and named exports, so each
  installed primitive is rewritten (`import Card, { CardContent } from '@/components/ui/card'`).
- Strict TypeScript everywhere — no `any`; narrow `unknown`.
- All new exported functions/components carry a one-line JSDoc summary (`@param`/`@returns` on
  functions).
- No inline styles, no arbitrary Tailwind color values, no one-off hex/rgba — only the design tokens
  from `src/styles/globals.css` (`bg-primary`, `text-muted-foreground`, `border-border`, …). A new color
  means a new variable in both `:root` and `.dark` plus an `@theme inline` entry.
- `'use client'` only where hooks, event handlers, or browser APIs require it; keep it low in the tree.
- Respect `prefers-reduced-motion` for every non-essential animation.
