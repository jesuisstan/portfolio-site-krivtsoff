# Stanislav Krivtsoff - Portfolio Website

A modern, responsive portfolio website showcasing my skills as a Frontend Developer. Built with Next.js, React, and modern web technologies.
The site is deployed on Vercel and can be accessed at [krivtsoff.online](https://krivtsoff.online).

## 🌟 Features

- **Single-page layout**: hero, skills & tech, experience, projects, contact — with a sticky nav that scrolls to each section
- **Dark/Light Theme**: `next-themes` with class strategy and system preference detection (dark by default)
- **Responsive**: mobile-first layout with a Radix-backed off-canvas drawer on small screens
- **Animations**: Framer Motion throughout, with `prefers-reduced-motion` respected
- **Contact form**: sends mail straight from the browser through EmailJS
- **SEO**: full metadata, OpenGraph and Twitter cards, web manifest, Vercel Analytics

## 🛠️ Technologies Used

### Frontend

- **Next.js 16** - React framework with App Router (Turbopack)
- **React 19** - Latest React with concurrent features
- **TypeScript** - strict mode, no `any`
- **Tailwind CSS 4** - Utility-first CSS framework, CSS-first configuration (no `tailwind.config.ts`)
- **Framer Motion** - Animation library
- **Lucide React** - Icon set

### Styling & UI

- **shadcn/ui** - every section is built on registry primitives (`components.json`: style `new-york`,
  base color `neutral`, CSS variables, `lucide` icons). Installed in `src/components/ui/`: `button`,
  `card`, `badge`, `input`, `textarea`, `label`, `sheet`, `tooltip`, `toggle`, `toggle-group`,
  `separator`. Add more with `npx shadcn@latest add @shadcn/<name>`
- **Magic UI** - a second, opt-in registry, used only where an animated component is asked for.
  Installed in `src/components/ui/`: `animated-theme-toggler`, `shine-border`, `border-beam`. Items come
  from `npx shadcn@latest add "https://magicui.design/r/<name>.json"`. Each one then has its decorative
  colours reduced to this project's tokens and its `motion/react` imports re-pointed to `framer-motion`,
  so the repo carries a single animation runtime
- **radix-ui** - the unified Radix package the current registry components import from
- **class-variance-authority** + **tailwind-merge**/**clsx** - variant recipes and the `cn()` helper
- **Design tokens** - OKLCH CSS variables in `src/styles/globals.css`, exposed to Tailwind through
  `@theme inline`; documented in [`DESIGN.md`](./DESIGN.md)
- **tw-animate-css** - the animation utilities shadcn components rely on
- **next-themes** - class-based dark/light theming, wired to the `.dark` custom variant

### Development Tools

- **PostCSS** + **@tailwindcss/postcss** - CSS processing (Tailwind v4 handles vendor prefixing itself, so there is no Autoprefixer)
- **ESLint** (flat config) - linting; also the authoritative code-style config via `eslint-plugin-prettier`
- **Prettier** - formatting, driven through ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9+ (required by Next.js 16)
- npm (the project uses npm; do not mix in yarn or pnpm)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jesuisstan/portfolio-site-krivtsoff.git
cd portfolio-site-krivtsoff
```

2. Install dependencies:

```bash
npm install
```

3. Enable the repository's git hooks (once per clone — git does not do this for you):

```bash
git config core.hooksPath .githooks
```

`.githooks/pre-commit` runs `npm run design:check` and blocks a commit whose design tokens have drifted
from `src/styles/globals.css`. Without this step the check simply never runs.

4. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables. All of them are
`NEXT_PUBLIC_*`, so they are inlined into the client bundle — never put a secret here.

```bash
# Contact Information
NEXT_PUBLIC_CONTACT_LOCATION=

# Social Media Links
NEXT_PUBLIC_LINK_GITHUB=https://...
NEXT_PUBLIC_GITHUB_PROFILE=https://...
NEXT_PUBLIC_LINK_LINKEDIN=https://...
NEXT_PUBLIC_LINK_INSTAGRAM=https://...
NEXT_PUBLIC_LINK_FACEBOOK=https://...
NEXT_PUBLIC_LINK_TELEGRAM=https://t...
NEXT_PUBLIC_LINK_WHATSAPP=https://wa.me/...

# CV Download
NEXT_PUBLIC_LINK_CV_DOWNLOAD=...

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_USER_ID=...
```

Update these values with your actual contact information and social media links.

> `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_CONTACT_PHONE` used to be documented here but no code
> reads them any more — the contact section shows the location plus the messenger links. They are listed
> as unused rather than required; wire them back into `Contact.tsx` or delete them from `.env.local`.

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

```bash
npm run dev          # development server
npm run build        # production build (type-checks the project)
npm start            # serve the production build

npm run lint         # ESLint — the authoritative style check
npm run lint:fix     # ESLint with --fix (also runs automatically after every edit by Claude Code)
npm run typecheck    # tsc --noEmit

npm run design:sync  # regenerate DESIGN.md's token frontmatter + .impeccable/design.json from globals.css
npm run design:check # fail if that generated layer is stale (read-only)

npm run fresh        # wipe .next / .swc / node_modules / package-lock.json and reinstall
```

> There is no `format` script and no `.prettierrc`: the Prettier options live inside `eslint.config.mjs`
> as a `prettier/prettier` rule, so bare Prettier would format against its own defaults and fight
> ESLint. `npm run lint:fix` is the only formatter.

> Do not run `npm run build` while `npm run dev` is live on the same checkout — both write to `.next`
> and the production artifacts clobber the dev manifests, after which the dev server answers every
> request with `Internal Server Error` until restarted. Use `npm run typecheck` while it is up.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout: font, theme provider, metadata, analytics
│   └── page.tsx            # Home page — renders every section in order
├── components/             # React components
│   ├── ui/                 # shadcn/ui primitives (button, card, badge, input, textarea,
│   │                       #   label, sheet, tooltip, toggle, toggle-group, separator)
│   │                       #   + animated-theme-toggler, shine-border, border-beam (Magic UI)
│   ├── Banner.tsx          # Hero section + animated stat counters
│   ├── banner-content.ts   # Hero stat + social link data
│   ├── SkillsAndTech.tsx   # Skills groups + technology logo grid with category filter
│   ├── Experience.tsx      # Work experience timeline
│   ├── Projects.tsx        # Projects showcase with category filter
│   ├── Contact.tsx         # Contact form (EmailJS) + contact details
│   ├── NavBar.tsx          # Sticky navigation, mobile drawer (sheet), theme toggle
│   ├── Footer.tsx          # Site footer
│   └── ThemeProvider.tsx   # next-themes wrapper
├── constants/              # Page content data + its TypeScript types
│   ├── experiences.ts      # Timeline entries
│   ├── projects.ts         # Project cards
│   └── technologies.ts     # Technology / logo entries
├── lib/
│   └── utils.ts            # `cn()` class-merge helper
├── types/
│   └── css.d.ts            # ambient declaration for stylesheet side-effect imports
└── styles/
    └── globals.css         # Tailwind v4 entry, design tokens, base layer, scrollbar
```

Root-level configuration: `components.json` (shadcn/ui), `postcss.config.js`, `next.config.ts`,
`tsconfig.json`, `eslint.config.mjs`. Tailwind has no config file — its theme lives in
`src/styles/globals.css`.

Also at the root: `PRODUCT.md` (the durable product record — audience, positioning, protected facts),
`DESIGN.md` (the design system, its token frontmatter generated from `globals.css`),
`scripts/design-sync.mjs` (that generator) and `.impeccable/` (the design skill's config and the
machine-readable sidecar `design.json`).

Static assets live in `public/`: favicons, the web manifest, the avatar, the CV PDF, the Telegram and
WhatsApp QR codes, project screenshots (`public/projects/`) and technology logos (`public/powered-by/`).

## 🎨 Design System

The visual system lives in **[`DESIGN.md`](./DESIGN.md)** — palette and colour roles, typography,
layout and breakpoints, elevation, shapes, per-component specs, and the rules that govern them. It is
the single place design decisions are recorded; this README deliberately does not restate them.

Two facts about how it is wired, because they affect the build rather than the design:

- **`src/styles/globals.css` is the only place a token value exists.** Tailwind CSS 4 is configured
  CSS-first, so there is no `tailwind.config.ts` to keep in step.
- `DESIGN.md`'s YAML frontmatter and `.impeccable/design.json` are **generated** from that stylesheet
  by `npm run design:sync`; `npm run design:check` reports drift without writing. Edit the token in the
  CSS and run the script — never hand-edit the generated frontmatter.

Product context — who the site is for, what it claims, and which facts must not be changed — lives in
**[`PRODUCT.md`](./PRODUCT.md)**.

## 🤖 Working on this repo with Claude Code

`CLAUDE.md` holds the project guidance (architecture, conventions, the build → verify loop), and
`.claude/` contains the specialized agents (`frontend`, `platform`, `verifier`) plus the shared rules.

Two hooks keep the generated design layer honest, and they cover different gaps. `.claude/settings.json`
runs `scripts/design-sync.mjs` after Claude Code edits `globals.css` or `DESIGN.md` — that only fires for
edits made through Claude Code's tools. `.githooks/pre-commit` runs `npm run design:check` and blocks a
drifted commit whichever editor made the change.

The four root documents each own their subject and link to each other rather than repeating it — this
README the project and its stack, `CLAUDE.md` how to work in the repo, `DESIGN.md` the visual system,
`PRODUCT.md` the product truth. `.claude/rules/docs-maintenance.md` holds that ownership table and is
what keeps a fact from being written in two places.

Component work goes through the **shadcn MCP server** (declared in `.mcp.json`) and the project-level
`shadcn` skill in `.agents/skills/shadcn` (installed with `npx skills add shadcn/ui`, symlinked into
`.claude/skills/`, tracked in `skills-lock.json`) — primitives are searched, inspected and installed from
the registry rather than hand-written. The **magicuidesign MCP server** is available for the same
workflow against the Magic UI registry, but only when an animated component is explicitly requested.

## 📞 Contact

- **Website**: [krivtsoff.online](https://krivtsoff.online)
- **LinkedIn**: [linkedin.com/in/krivtsoff](https://linkedin.com/in/krivtsoff)
- **GitHub**: [github.com/jesuisstan](https://github.com/jesuisstan)

---

Made with ❤️ in Paris, France
