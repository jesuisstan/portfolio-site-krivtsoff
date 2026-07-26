# Documentation Lookup Rule

Before writing or editing code that uses a library, framework, or API whose current usage you are
not certain of (Next.js App Router, next-themes, Framer Motion, Radix UI, shadcn CLI, Tailwind,
`next/image`, `next/font`, EmailJS, etc.), look up
up-to-date documentation via the **context7** MCP tools (`resolve-library-id` then
`query-docs`) instead of relying on memorized/training-data knowledge.

## When to use it

- Before adding a new dependency or a new usage pattern of an existing one.
- Before implementing a new component, hook, API route, or piece of middleware that depends on a
  library's public API surface.
- When behavior differs across versions and you are not sure which version this repo pins
  (check `package.json` first, then resolve that version's docs via context7).

## When it's not needed

- Pure internal refactors that don't touch a library's public API.
- Changes confined to this repo's own modules (content data, config values, styling tokens) where
  the correct usage is already established by existing code in the repo.

## Why

Training data goes stale and library APIs change between versions; confirming current usage via
context7 avoids introducing code based on a deprecated or non-existent API.
