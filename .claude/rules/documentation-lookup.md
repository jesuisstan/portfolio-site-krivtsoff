---
paths:
  - 'src/**'
  - 'scripts/**'
  - '*.config.{ts,mjs,js}'
  - 'package.json'
---

# Documentation lookup

Training data goes stale and these libraries change between majors. Before writing code against an API
you have not just seen working in this repo — Next.js 16 (App Router, metadata, `proxy.ts`, `next/image`,
`next/font`), React 19, next-intl 4, Framer Motion 12, Tailwind v4, Radix/shadcn, Lenis, EmailJS — read
the installed version in `package.json`, then that version's docs through **context7**
(`resolve-library-id` → `query-docs`). It is required for unfamiliar usage, not a matter of confidence.

For a shadcn primitive the registry is the source: the shadcn MCP, or `npx shadcn@latest docs <name>`.

Not needed for changes confined to this repo's own modules where the usage is already established in the
code.
