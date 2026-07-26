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
- **Documentation is part of the deliverable**: `README.md` and `CLAUDE.md` must be true at all times.
  Any change that invalidates a statement in either file fixes it in the **same** change, never as a
  follow-up — see `.claude/rules/docs-maintenance.md` for the trigger table and the reporting format.
- **UI components**: the shadcn CLI is **not initialized yet** (no `components.json`). When a real
  primitive is first needed, initialize it and source primitives from the `@shadcn` registry via the
  shadcn MCP tools and `npx shadcn@latest add` — never hand-write a primitive the registry ships, and
  never paste registry source by hand. Magic UI (`magicuidesign-mcp`) only when the user explicitly
  asks. Every installed component must then be reconciled with the design system — see
  `.claude/agents/frontend.md`.

## Self-verifying loop (mandatory for UI/behavior work)

Any task that changes what a visitor sees or how the site behaves MUST go through a
build → verify → correct loop before it is reported as done. The loop is orchestrated in the main
conversation (subagents cannot spawn subagents), using the three specialized agents.

1. **Define acceptance criteria first.** Restate the task as a short list of observable, checkable
   outcomes (e.g. "the projects grid renders 3 columns at 1280px, 1 column at 360px, and the category
   filter narrows the visible cards"). If the task does not already imply clear criteria, ask the user
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
6. **Sync the docs.** Before reporting done, check the change against `README.md` and `CLAUDE.md` and
   fix whatever it made false (`.claude/rules/docs-maintenance.md`). A builder agent that returned
   `Docs: no change needed` is not a substitute for your own check — you see the whole change, it saw
   only its slice.
7. **Stop honestly.** If still failing after 3 iterations, or on `BLOCKED`, stop and report the last
   verdict plainly — never claim success the verifier did not confirm.

Prerequisite: the chrome-devtools MCP server must be connected. If it is not, report `BLOCKED` rather
than skipping verification silently. No credentials are needed — the site has no auth.

Skip the loop only for changes with no runtime surface (docs, config with no visual effect, dependency
bookkeeping). When in doubt, verify.

## Commands

```bash
npm run dev            # next dev on http://localhost:3000
npm run build          # production build (also type-checks once TS is in place)
npm run start          # serve the production build

npm run lint           # eslint (flat config) — the authoritative style config
npm run lint:fix       # runs automatically after every edit via a PostToolUse hook
npx tsc --noEmit       # type-check without building
```

## Architecture

### Purpose

Personal portfolio site of Stanislav Krivtsoff, frontend developer in Paris. Deployed on Vercel at
[krivtsoff.online](https://krivtsoff.online). Its job is to demonstrate its author's craft, so visual
quality is the product, not decoration.

### Shape

A **single route**. `src/app/page.tsx` renders the sections in order: `NavBar`, `Banner`,
`SkillsAndTech`, `Experience`, `Projects`, `Contact`, `Footer`. `src/app/layout.tsx` owns the font
(Montserrat via `next/font`), the `next-themes` provider (class strategy, `defaultTheme="dark"`), site
metadata/OpenGraph, and Vercel Analytics. `NavBar.tsx` owns the sticky nav, the mobile drawer, and the
theme toggle; there is no scroll-spy. The styling stack is Tailwind + Radix only — MUI and Bootstrap
were removed on 2026-07-26 along with the dead `MenuDrawer`/`ThemeToggler` components.

Content data and its exported types live in `src/constants/{experiences,projects,technologies}.ts`;
images and the CV PDF in `public/`.

There is **no** auth, database, upstream API, middleware, i18n, or API route handler. The only network
call is a client-side EmailJS send from `src/components/Contact.tsx`. Do not introduce any of those
without asking.

### Styling

Tailwind CSS 3.4 (`tailwind.config.ts`, `darkMode: ['class']`) plus hand-written legacy classes in
`src/styles/globals.css` (`.gradient-text`, `.glass-effect`, `.button-primary`, `.card-hover`, …) and a
duplicated hex palette in `tailwind.config.ts` + `src/styles/portfolioColors.ts`. All of that is legacy
and is being replaced by a token-based design system — see `.claude/agents/frontend.md` and
`.claude/rules/code-organization.md`. Once the `impeccable` skill is initialized, `DESIGN.md` at the
repo root is the single source of truth for the design system.

### Environment variables

Every key is `NEXT_PUBLIC_*` and therefore public by design (inlined into the client bundle): contact
details, social links, the CV download URL, and the EmailJS service/template/user IDs. `README.md`
documents the full list. Nothing secret may be added under that prefix.

## Code conventions

- `@/` maps to `src/` — always use the alias.
- **Arrow function syntax** for all components and functions, assigned to a `const`; the file's primary
  component is exported at the bottom via `export default` and imported as a default import.
- Strict TypeScript everywhere — no `any`; narrow `unknown`.
- All new exported functions/components carry a one-line JSDoc summary (`@param`/`@returns` on
  functions).
- No inline styles, no arbitrary Tailwind color values, no one-off hex/rgba — named tokens only.
- `'use client'` only where hooks, event handlers, or browser APIs require it; keep it low in the tree.
- Respect `prefers-reduced-motion` for every non-essential animation.
