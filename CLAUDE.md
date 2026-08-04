# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Ground rules

- **Language**: All code, comments, JSDoc and documentation must be written in **English**. User-visible
  copy is bilingual and never hardcoded — it lives in `src/i18n/messages/{en,fr}.json`, English first,
  with the French translation added in the same change. See § Internationalization.
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
  currently holds seven such components in `src/components/ui/`: `animated-theme-toggler` (the nav
  theme switch), `shine-border` (the contact form card), `border-beam` (the hero "Download CV"
  button), `particles` (the hero and footer background field), `orbiting-circles` (the skills
  section's orbital system), `lens` (the magnifier over each project card's screenshot) and
  `magic-card` (the hover treatment of each Experience timeline card), each
  installed from `https://magicui.design/r/<name>.json`. Three of them — `border-beam`, `lens` and
  `magic-card` — ship importing `motion/react`; that import is deliberately re-pointed to `framer-motion`
  so the repo carries
  one animation runtime, which means `shadcn diff` reports a mismatch on them. The other four need no
  animation runtime at all: `animated-theme-toggler` and `shine-border` import none, and `particles` and
  `orbiting-circles` animate on a canvas and in CSS. `lens` diverges twice
  more: upstream's focusable `role="region"` wrapper is dropped, because the effect is pointer-only and
  a tab stop per card that does nothing is an accessibility regression, and its `rounded-xl` default is
  dropped so the consumer owns the shape. `magic-card` diverges three times more: it paints
  `--color-card` rather than `--color-background`, because the two differ in dark mode and these are
  cards; its two `useMotionTemplate` calls are hoisted out of the `mode` branches, where upstream calls
  them conditionally; and upstream's `mounted` state flag is replaced by next-themes' `resolvedTheme`,
  which is already undefined until hydration, because setting state in an effect trips
  `react-hooks/set-state-in-effect`. `particles` needs no
  animation library and is kept as upstream source apart from React-correctness fixes. It and
  `magic-card` are the **two sanctioned exceptions to the no-raw-colour rule**, because one paints a
  `<canvas>` and the other interpolates colours into an inline `radial-gradient()`, neither of which a
  token class can reach — their colour props take hex literals, supplied by `useParticleColor()` in
  `src/lib/particle-color.ts` (`--foreground`) and `useMagicCardColors()` in
  `src/lib/magic-card-color.ts` (`--primary`, `--primary-alt`, and `--accent` per theme). Those
  two hooks are the only place such literals may live; see `DESIGN.md` § Colors for the rule. Do not
  generalise the exception to anything a token can style — `orbiting-circles`
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
   outcomes (e.g. "the projects chapter pans sideways at 1280px and falls back to a 1-column grid at
   360px, and the category filter narrows the visible cards without moving the pinned control bars").
   If the task does not already imply clear criteria, ask the user
   one focused question before building — the loop cannot judge PASS/FAIL without them.
2. **Ensure the site is running.** The `verifier` needs the dev server at `http://localhost:3000`.
   Start it in the background if it is not up and confirm it responds before delegating verification.
3. **Build.** Delegate the implementation to `frontend` and/or `platform` per
   `.claude/rules/agent-delegation.md`.
4. **Verify.** Delegate to the `verifier` agent (`.claude/agents/verifier.md`), passing the exact
   acceptance criteria. It drives Chrome via the chrome-devtools MCP and returns a structured
   `VERDICT: PASS | FAIL | BLOCKED`. Beyond the given criteria the verifier ALWAYS checks: both locales
   (`/` **and** `/fr`, with no leftover English on the French page and no translated technology or
   company name), both themes (light **and** dark), responsiveness with no horizontal overflow at
   360/768/1280, a clean console, no failed asset requests, and no placeholder text on screen — a break
   in any of those is a FAIL even when it was not part of the task.
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

npm run fresh          # wipe .swc / .next / node_modules / package-lock.json and reinstall
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

**One page, two locales.** `src/app/[locale]/page.tsx` renders a flex column holding `<main>` — the
sections in order: `NavBar`, `Banner`, `SkillsAndTech`, `Experience`, `Projects`, then `Contact` wrapped
in `CurtainStage` — and `Footer` plus `ScrollToTop` as siblings *after* it. `ScrollToTop` is a fixed
control outside the section flow, which reveals itself from an `IntersectionObserver` on the hero.

Three mechanical constraints in that shell break silently if changed. The footer's travel is an in-flow
spacer inside `<main>`, never a bottom margin on it: a margin falls outside the sticky containing block,
and `CurtainStage` needs the spacer to hold the last section against while the panel draws over it. The
footer paints **above** `<main>` (`z-20` against `z-10`) and slides up over it, so its surface must stay
opaque — a translucent fill would let the content it covers read through. And `<main>` must never get
`overflow-hidden`: it would become a scroll container and kill `position: sticky` in every section below.
`<footer>` is a sibling rather than nested, because a `<footer>` inside `<main>` is not a `contentinfo`
landmark.

**Scroll-linked sections.** `src/components/HorizontalChapter.tsx` pins a `sticky top-0 h-svh` viewport
inside a tall outer box and translates a flex track on X in proportion to that box's scroll progress, so
`SkillsAndTech` and `Projects` travel sideways under ordinary vertical scrolling — there is no wheel or
key interception anywhere on the site, and adding any would be a regression. It exports
`useHorizontalChapter()` (the `lg` + non-reduced-motion gate), `ScrollHint`, `COVER_PANEL_CLASS` and
`panelScrollTarget()`. The class is only ever applied while the chapter travels, and it needs the
`--panel-gutter` the track publishes, because a panel narrower than the viewport cannot get the
container's left offset from `mx-auto`. `panelScrollTarget()` finds the chapter through the
`data-chapter` attribute on its outer box and **not** through `offsetParent`, which stops at the pinned
viewport — `sticky` counts as positioned, and reading the offset from it silently returns the scroll
position the page is already at. It also takes optional `topBar`/`bottomBar` controls, rendered inside the
pin but outside the track; with them the group is centred and the track keeps its content height, so a
panel whose height depends on its content must be pinned to a fixed one or the bars move with it. Two
consequences to
respect: the gate is `false` through SSR and hydration by design, so a consumer must keep **one** JSX
tree across the flip — swapping the top-level element unmounts the node `useInView` bound to, and
framer-motion's effect does not re-subscribe on a ref change (this shipped as a blank Projects section
once); and the reveal observer belongs on the section, which spans the whole travel, not on a panel that
translates off-screen. Sizing comes from a measured `--panel-width`, not `w-screen`, because `100vw`
includes the scrollbar. `src/components/CurtainStage.tsx` pins the page's last section the same way for
the footer curtain, and its offset has to be measured for one CSS reason: `sticky` only ever pushes an
element *down* past its flow position, and only through `top` — a `bottom` offset shifts it the other way
and drags the section up the page instead. Parking the section's bottom edge on the panel's peek strip is
therefore a `top` of viewport minus the section's own height, which no CSS length can express; it goes
negative for a section taller than the stage, which is what lets a long one scroll through in full before
it locks. The gate and the peek height that the stage and `Footer` must agree on live in
`src/lib/curtain.ts`. See `DESIGN.md` for what the chapters look like and how the footer curtain reads.
`src/app/[locale]/layout.tsx` is the document shell: it owns the font (Montserrat via `next/font`), the
`NextIntlClientProvider`, the `next-themes` provider (class strategy, `defaultTheme="dark"`), `SmoothScroll`,
Vercel Analytics, and `generateMetadata` — metadata is per-locale and therefore a function, not a static
export. `SmoothScroll.tsx` is the whole of the Lenis wiring: a client leaf that mounts `ReactLenis root`
and renders no DOM, so the layout stays a server component. It animates the **real** scroll position —
never a transform wrapper — which is why `sticky`, `useScroll` and `scroll-padding-top` all still work,
and it is not mounted at all under `prefers-reduced-motion`. Every programmatic scroll on the page goes
through `useSmoothScrollTo()` in `src/lib/smooth-scroll.ts` rather than calling `window.scrollTo`, which
Lenis would otherwise fight; that hook also guarantees its `onComplete` fires exactly once, including
when the visitor grabs the scroll mid-jump. Its `immediate` option exists for one case: re-anchoring a
scroll whose page is about to change height in the same frame, where an eased jump is clamped away
mid-flight and Lenis then resyncs to the clamped position. `globals.css` therefore carries no
`scroll-behavior: smooth`. `NavBar.tsx` owns the fixed nav and its hide-on-scroll-down behaviour (see
`DESIGN.md` § Navigation for the rule and what pins it visible), the mobile drawer (a shadcn `Sheet`, so Radix handles focus
trapping and scroll locking), the theme toggle (Magic UI's `AnimatedThemeToggler`, driven in controlled
mode from `useTheme()` so `next-themes` keeps sole ownership of persistence, styled with
`buttonVariants`) and `LanguageToggle`; there is no scroll-spy. The styling stack is Tailwind + Radix
only — MUI and Bootstrap were removed on 2026-07-26 along with the dead `MenuDrawer`/`ThemeToggler`
components. The layout and page are server components; each section carries its own `'use client'`.

Content data and its exported types live in `src/constants/{experiences,projects,technologies}.ts`;
per-component render data sits next to its consumer (`src/components/banner-content.ts`); images and
the CV PDF in `public/`.

There is **no** auth, database, upstream API, or API route handler. The only network call is a
client-side EmailJS send from `src/components/Contact.tsx`. Do not introduce any of those without
asking. There **is** a `src/proxy.ts`, but it exists solely for locale negotiation (below) — anything
else belongs in a component or in `next.config.ts`.

### Internationalization

English (default) and French, through **next-intl** with locale-based routing. `src/i18n/routing.ts` is
the one place the locale set lives; everything else derives from it.

- **URLs**: `localePrefix: 'as-needed'` — English stays on `/` with no prefix, French is `/fr`. This
  keeps every pre-existing inbound link working. Locale detection is **on**, so a French-preferring
  browser hitting `/` is redirected to `/fr` and the choice is remembered in next-intl's cookie.
- **`src/proxy.ts`** holds `createMiddleware(routing)`. The file convention is `proxy.ts` from Next 16
  on; `middleware.ts` still works but logs a deprecation warning. The next-intl import path is still
  `next-intl/middleware`. Its matcher must keep excluding anything with a file extension — the CV PDF,
  favicons, QR codes and screenshots are served from `public/` and must not be rewritten.
- **Static rendering is not optional here.** It is the reason URL routing was chosen over a
  cookie-only setup, and it only holds while `generateStaticParams` and `setRequestLocale` are called in
  both the layout and the page. Reading the locale from `cookies()` instead would make every request
  dynamic.
- **Catalogues**: `src/i18n/messages/{en,fr}.json`, grouped by site section (`nav`, `banner`, `skills`,
  `experience`, `projects`, `contact`, `footer`, plus `common` and `metadata`). **All authored keys are
  kebab-case.** The two files must always carry identical key sets.
- **Typed keys**: `src/types/next-intl.d.ts` augments next-intl's `AppConfig` with `Locale` and
  `Messages` from `en.json`. That augmentation is load-bearing — without it a `t()` call built from a
  template literal fails to type-check and `t.raw()` loses its array type.
- **Translate the label, never the value.** Filter categories are kebab-case keys (`'full-stack'`,
  `'devops'`) that both the data and the filtering logic use; only the displayed label is looked up.
  Never build a filter comparison out of translated text.
- **A phrase is one message.** Headings with a single teal word, the Experience position lines and the
  footer's "Made with ♥ in Paris, France" are rich-text messages with tags (`<accent>`, `<company>`, `<heart>`),
  because word order and punctuation spacing differ between the two languages. Never assemble a
  sentence by concatenating fragments in JSX.
- **New copy lands in both files in the same change.** English-only text on the page is a bug, and so
  is a key present in one catalogue and missing from the other.
- **What is not translated**: technology names, company names, project titles, the official French RNCP
  certificate titles, `krivtsoff.develop()`, the author's name, and service names (GitHub, LinkedIn,
  Telegram, …). These live in `src/constants/`, which holds only the non-translatable half of the
  content; the prose half lives in the catalogues, keyed by the same entry key.

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
  `@custom-variant dark (&:is(.dark *))` (keyed to the `next-themes` class strategy), the `--animate-shine`
  and `--animate-orbit` keyframe pairs inside the same `@theme inline` block, the `@layer base` reset,
  `html { scroll-padding-top: 4rem }` — the padding is what stops an anchor jump from parking a heading
  under the fixed nav, and there is deliberately **no** `scroll-behavior: smooth` beside it, because the
  inertia layer owns every jump — the scrollbar rules, and the three
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
