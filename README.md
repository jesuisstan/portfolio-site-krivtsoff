# Stanislav Krivtsoff - Portfolio Website

A modern, responsive portfolio website showcasing my skills as a Frontend Developer. Built with Next.js, React, and modern web technologies.
The site is deployed on Vercel and can be accessed at [krivtsoff.online](https://krivtsoff.online).

## 🌟 Features

- **Single-page layout**: hero, skills & tech, experience, projects, contact — with a sticky nav that scrolls to each section
- **Dark/Light Theme**: `next-themes` with class strategy and system preference detection (dark by default), toggled with a View Transitions clip-path reveal
- **Responsive**: mobile-first layout with a Radix-backed off-canvas drawer below the `lg` breakpoint
- **Animations**: scroll reveals, staggered lists and animated stat counters via Framer Motion
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
  Installed in `src/components/ui/`: `animated-theme-toggler` (the nav theme switch) and
  `shine-border` (the contact form card). Items come from
  `npx shadcn@latest add "https://magicui.design/r/<name>.json"`, then get their decorative colors
  reduced to this project's tokens
- **radix-ui** - the unified Radix package the current registry components import from
- **class-variance-authority** + **tailwind-merge**/**clsx** - variant recipes and the `cn()` helper
- **Design tokens** - OKLCH CSS variables in `src/styles/globals.css`, exposed to Tailwind through `@theme inline`
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

3. Set up environment variables:

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

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

```bash
npm run dev          # development server
npm run build        # production build (type-checks the project)
npm start            # serve the production build

npm run lint         # ESLint — the authoritative style check
npm run lint:fix     # ESLint with --fix (also runs automatically after every edit by Claude Code)
npm run typecheck    # tsc --noEmit

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
│   │                       #   + animated-theme-toggler, shine-border (Magic UI)
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
└── styles/
    └── globals.css         # Tailwind v4 entry, design tokens, base layer, scrollbar
```

Root-level configuration: `components.json` (shadcn/ui), `postcss.config.js`, `next.config.ts`,
`tsconfig.json`, `eslint.config.mjs`. Tailwind has no config file — its theme lives in
`src/styles/globals.css`.

Static assets live in `public/`: favicons, the web manifest, the avatar, the CV PDF, the Telegram and
WhatsApp QR codes, project screenshots (`public/projects/`) and technology logos (`public/powered-by/`).

## 🎨 Design System

The palette is the shadcn/ui token set (neutral base) written as OKLCH CSS variables in
`src/styles/globals.css`, with a `:root` and a `.dark` block and an `@theme inline` mapping that turns
each one into a Tailwind color utility:

- **Brand**: teal `#00babc` = `oklch(0.715 0.122 196.14)`, used for `--primary`, `--ring`, `--chart-1`
  and the sidebar accents; `--primary-foreground` is near-black for a 8.25:1 contrast ratio on it
- **Second brand accent**: coral `--primary-alt` with `--primary-alt-foreground` (the same near-black,
  7.56:1 on the coral). Its lightness matches `--primary`, so the two accents read as siblings rather
  than one shouting over the other. Theme-constant — declared in `:root` only, like `--primary`'s value.
  Used sparingly and on purpose: one hero chip, the footer heart, one of the two `ShineBorder` stops.
  `text-primary-alt` carries the same restriction as `text-primary` — 2.62:1 on the light background,
  so display-size or decorative only, never body copy or small links
- **Neutrals**: the shadcn neutral scale — `--background`, `--foreground`, `--card`, `--popover`,
  `--secondary`, `--muted`, `--border`, `--input`
- **Accent**: `--accent` is a teal-tinted neutral wash; `--accent-foreground` is the high-contrast
  teal used for links and small accent text in both themes
- **Danger**: `--destructive` with `--destructive-foreground`
- **Overlay**: `--overlay`, the theme-constant scrim behind the mobile sheet (declared in `:root` only)
- **Radius**: `--radius` (0.625rem) plus the derived `--radius-sm|md|lg|xl`

There is no legacy CSS layer any more: the hand-written `.gradient-text`, `.glass-effect`,
`.button-primary`, `.button-secondary`, `.container-custom` and `.card-hover` classes were deleted when
the sections moved onto shadcn primitives. `globals.css` now holds only the Tailwind entry, the token
blocks, the `float` keyframes, the base layer, smooth scrolling (which the nav links rely on), the
scrollbar rules, the three `::view-transition-*(root)` rules the theme toggler needs, and one
`@source` declaration — the Tailwind entry is imported with `source(none)` and `src/` is registered
explicitly, because automatic detection scans the whole repository (minus `node_modules` and gitignored
files) and was compiling utility names that appear only as prose in the agent and skill markdown.

Use the utilities (`bg-primary`, `text-muted-foreground`, `border-border`, …). A new color is a new
token: add the variable to both `:root` and `.dark` (or to `:root` only when it is identical in both
themes), then map it in `@theme inline` — never a one-off hex value or an arbitrary Tailwind color.

`text-primary` is the brand teal at full chroma: it only clears contrast requirements on dark
backgrounds, so it is reserved for display-size headings, icons, and decorative fills. Reading text
uses `text-foreground` / `text-muted-foreground`, and teal-toned links use `text-accent-foreground`.

### Typography

- **Font**: Montserrat, loaded through `next/font/google`
- **Headings**: bold weights in `text-foreground`, with a single accent word in `text-primary`
- **Body**: regular weight in `text-foreground` / `text-muted-foreground`

### Animations

- **Scroll reveals**: staggered fade/translate via Framer Motion `useInView`
- **Hero counters**: count-up animation on first view
- **Hover effects**: restrained border, background and scale transitions from the primitives
- **Theme switch**: Magic UI's `AnimatedThemeToggler` reveals the new theme with a 400ms circular
  clip-path through the View Transitions API, expanding from the nav button. It runs in controlled
  mode so `next-themes` stays the only owner of theme persistence, and it falls back to an instant
  swap where `document.startViewTransition` is unavailable
- **Contact form border**: Magic UI's `ShineBorder` traces a 1px teal → coral gradient
  (`var(--primary)`, `var(--primary-alt)`) around the form card on a 14s linear loop — slow enough to
  read as a highlight rather than a glow
- **Reduced motion**: `prefers-reduced-motion` disables the floating hero shapes, the pulsing
  accents, the hero count-up (which jumps straight to its final values), the contact form's shine
  (gated behind `motion-safe:`, leaving a static ring), and the theme-toggle reveal (`duration` drops
  to 0, so the theme swaps instantly)

## 📱 Responsive Design

Mobile-first, using Tailwind's default breakpoints:

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px — the desktop nav appears here; below it the mobile drawer takes over
- **xl**: 1280px

Column counts follow from that: the projects grid is 1 → 2 (`md`) → 3 (`lg`), and the technology grid is
2 → 3 (`sm`) → 4 (`md`) → 6 (`lg`) → 8 (`xl`). Two columns at the smallest width is deliberate — at three
the cards are too narrow for the longest category label and the page picks up a horizontal scrollbar.

## 🤖 Working on this repo with Claude Code

`CLAUDE.md` holds the project guidance (architecture, conventions, the build → verify loop), and
`.claude/` contains the specialized agents (`frontend`, `platform`, `verifier`) plus the shared rules.
Both `CLAUDE.md` and this README are kept in sync with the code — see
`.claude/rules/docs-maintenance.md`.

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
