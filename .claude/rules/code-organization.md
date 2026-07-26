# Code Organization Rules

## Extracted data & helpers — name modules by role, not by "type"

- Do not embed sizable static values inline in components, pages, or hooks — extract
  them. This covers: long string literals (code samples, templates), data arrays,
  lookup maps, and option/config lists.
- **Name the module for what it holds, not `constants.ts`/`utils.ts`.** A file literally
  named `constants` must contain only constant _values_; do not put functions there.
  Group by responsibility instead, e.g. for a page's folder:
  - `content.ts` — pure display data / static text the page renders directly.
  - `code-samples.ts` (or `<feature>.ts`) — functions that build/derive strings or
    structures, plus their private supporting consts.
    A module that pairs a few private consts with the functions that consume them is fine —
    that is cohesion, not a dumping ground.
- Put these files in the **same folder** as the consumer. If a value or helper is shared
  by several features, or reads environment/config, hoist it to `src/lib/`.
- Site-wide content data (project cards, timeline entries, tech logos) lives in
  `src/constants/` and is **values only** — no functions, no env reads, no derived state.
- Components read from these modules and stay focused on rendering. Export only what other
  files consume; keep purely local helpers unexported.
- A single short literal used once (a label, a className) does not need extracting —
  this targets bulky or reused values, not every string.

## Colors

- Never use arbitrary Tailwind color values — no `text-[#a3cfff]`, `bg-[#1b1828]`,
  or inline `style={{ color: ... }}`. All colors come from the named Tailwind tokens.
- A color token is an OKLCH CSS variable declared in `src/styles/globals.css` — in
  both `:root` and `.dark`, or in `:root` alone when it is theme-constant — and mapped
  to a Tailwind utility in the same file's `@theme inline` block. Tailwind v4 is
  CSS-first: there is no `tailwind.config.*` to edit.
- If a design needs a new color, **add a named token** (variable + config entry) and
  use the class (`bg-<name>`, `text-<name>-foreground`, …). Opacity modifiers on
  tokens are fine (`bg-accent/10`). Never introduce a one-off hex/rgba.
- The palette is the shadcn **neutral** token set with the brand teal as `--primary`.
  There is exactly one palette: a component that ships its own `:root`/`.dark` block
  must have it stripped on install.
