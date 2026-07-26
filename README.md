# Stanislav Krivtsoff - Portfolio Website

A modern, responsive portfolio website showcasing my skills as a Frontend Developer. Built with Next.js, React, and modern web technologies.
The site is deployed on Vercel and can be accessed at [krivtsoff.online](https://krivtsoff.online).

## 🌟 Features

- **Single-page layout**: hero, skills & tech, experience, projects, contact — with a sticky nav that scrolls to each section
- **Dark/Light Theme**: `next-themes` with class strategy and system preference detection (dark by default)
- **Responsive**: mobile-first layout with an off-canvas drawer below the `lg` breakpoint
- **Animations**: scroll reveals, staggered lists and animated stat counters via Framer Motion
- **Contact form**: sends mail straight from the browser through EmailJS
- **SEO**: full metadata, OpenGraph and Twitter cards, web manifest, Vercel Analytics

## 🛠️ Technologies Used

### Frontend

- **Next.js 16** - React framework with App Router (Turbopack)
- **React 19** - Latest React with concurrent features
- **TypeScript** - strict mode, no `any`
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon set

### Styling & UI

- **Tailwind + Radix UI** - the only styling stack; Radix primitives are installed and ready to use
- **next-themes** - class-based dark/light theming
- **Custom CSS classes** - a legacy layer in `src/styles/globals.css` (gradient text, glass effect, card hover) currently being replaced by a token-based design system

### Development Tools

- **PostCSS** + **Autoprefixer** - CSS processing
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
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_PHONE=
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
npm run lint:fix     # ESLint with --fix
npx tsc --noEmit     # type-check without building

npm run fresh        # wipe .next / .swc / node_modules / package-lock.json and reinstall
```

> `npm run format` runs bare Prettier, which does **not** read the project's style options (they live
> in `eslint.config.mjs`). Use `npm run lint:fix` instead.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout: font, theme provider, metadata, analytics
│   └── page.tsx            # Home page — renders every section in order
├── components/             # React components
│   ├── Banner.tsx          # Hero section + animated stat counters
│   ├── SkillsAndTech.tsx   # Skills groups + technology logo grid with category filter
│   ├── Experience.tsx      # Work experience timeline
│   ├── Projects.tsx        # Projects showcase with category filter
│   ├── Contact.tsx         # Contact form (EmailJS) + contact details
│   ├── NavBar.tsx          # Sticky navigation, mobile drawer, theme toggle
│   ├── Footer.tsx          # Site footer
│   └── ThemeProvider.tsx   # next-themes wrapper
├── constants/              # Page content data + its TypeScript types
│   ├── experiences.ts      # Timeline entries
│   ├── projects.ts         # Project cards
│   └── technologies.ts     # Technology / logo entries
├── lib/
│   └── utils.ts            # `cn()` class-merge helper
└── styles/
    ├── globals.css         # Tailwind directives + legacy custom classes
    └── portfolioColors.ts  # Legacy hex constants (being replaced by design tokens)
```

Static assets live in `public/`: favicons, the web manifest, the avatar, the CV PDF, project
screenshots (`public/projects/`) and technology logos (`public/powered-by/`).

## 🎨 Design System

The current palette is a legacy layer scheduled for replacement by named design tokens:

- **Brand**: teal `#00babc` (`colors.portfolio.green` in `tailwind.config.ts`), with darker variants
- **Neutrals**: Tailwind's gray scale, `whitesmoke` / `#151515` for surfaces
- **Danger**: `rgb(206, 58, 73)`
- **Decorative gradients**: teal → indigo → violet, used by `.gradient-text` and the primary button

New colors must be added as named tokens (a CSS variable in `globals.css` plus an entry in
`tailwind.config.ts`) — not as one-off hex values.

### Typography

- **Font**: Montserrat, loaded through `next/font/google`
- **Headings**: bold weights, some with gradient text
- **Body**: regular weight

### Animations

- **Scroll reveals**: staggered fade/translate via Framer Motion `useInView`
- **Hero counters**: count-up animation on first view
- **Hover effects**: card lift, scale and color transitions

## 📱 Responsive Design

Mobile-first, using Tailwind's default breakpoints:

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px — the desktop nav appears here; below it the mobile drawer takes over
- **xl**: 1280px

## 🤖 Working on this repo with Claude Code

`CLAUDE.md` holds the project guidance (architecture, conventions, the build → verify loop), and
`.claude/` contains the specialized agents (`frontend`, `platform`, `verifier`) plus the shared rules.
Both `CLAUDE.md` and this README are kept in sync with the code — see
`.claude/rules/docs-maintenance.md`.

## 📞 Contact

- **Website**: [krivtsoff.online](https://krivtsoff.online)
- **LinkedIn**: [linkedin.com/in/krivtsoff](https://linkedin.com/in/krivtsoff)
- **GitHub**: [github.com/jesuisstan](https://github.com/jesuisstan)

---

Made with ❤️ in Paris, France
