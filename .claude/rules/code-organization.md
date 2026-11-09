---
paths:
  - 'src/**/*.{ts,tsx}'
  - 'src/styles/**'
---

# Code organization

## Data and helpers: name modules by role

- Extract sizable static values from components, pages and hooks: long string literals, data arrays,
  lookup maps, option lists. A single short literal used once (a label, a className) stays inline.
- Name the module for what it holds, never `constants.ts`/`utils.ts` as a dumping ground:
  `content.ts` for render data, `<feature>.ts` for builder functions plus their private consts (that
  pairing is cohesion). A file named `constants` holds values only.
- Keep it next to its consumer; hoist to `src/lib/` once several features share it or it reads
  env/config.
- Site-wide content (project cards, timeline entries, technology logos) lives in `src/constants/` —
  values and their exported types only: no functions, env reads or derived state.
- Components stay focused on rendering. Export only what other files consume.

## Colours

- No arbitrary colour values: no `text-[#a3cfff]`, `bg-[#1b1828]`, `rgb()`, stock palette
  (`gray-700`), or inline `style={{ color }}`. Colours come from token utilities; opacity modifiers
  (`bg-accent/10`) are the way to lighten one.
- A new colour is a new token: an OKLCH variable in `src/styles/globals.css` — in `:root` and `.dark`,
  or `:root` alone when theme-constant — mapped in the same file's `@theme inline`, then
  `npm run design:sync`. Tailwind v4 is CSS-first: there is no `tailwind.config.*`.
- One palette: the shadcn neutral set with the brand teal as `--primary`. A component that ships its
  own `:root`/`.dark` block has it stripped on install.
- The only hex literals allowed are in the `src/lib/*-color.ts` hooks that convert an existing token
  for a `<canvas>` or an inline gradient (`DESIGN.md` § The Literal Escape Hatch).
