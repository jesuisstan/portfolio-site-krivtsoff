# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — hiring managers and tech leads.** Engineers evaluating actual craft. They read the site as
a work sample, then click through to GitHub repositories and live demos to check whether the code
matches the claim. They are the audience the site must convince, and the only one who will look past
the first viewport on purpose.

**Primary — technical recruiters and sourcers.** Arriving from LinkedIn for a fast credibility check:
is this a real frontend developer, at what level, based where, and available? They skim, often under a
minute, and need role, level, location, availability, and a way to reach him without scrolling for it.

Both audiences are in a screening situation, not a browsing one. Neither is a buyer of services — the
site's job is employment, not freelance lead generation.

## Product Purpose

The personal portfolio of Stanislav Krivtsoff, frontend developer in Paris, France, deployed at
[krivtsoff.online](https://krivtsoff.online). It exists to win technical interviews for frontend roles.
Success is a qualified conversation: a recruiter or hiring manager who arrives cold, believes the claim,
and makes contact — via the contact form, a messenger link, or a downloaded CV.

Because the audience judges craft, the site's own execution is part of the evidence, not packaging
around it. A visible flaw in the portfolio is a flaw in the argument.

## Positioning

**Data-visualization frontend specialist.** Since September 2023, at Quantcube Technology in Paris, he
has been building a large-scale SaaS platform that visualizes 40+ real-time macroeconomic Big Data
indicators for financial institutions and analysts: interactive charts, heatmaps, and geospatial maps,
plus BFF logic against GraphQL APIs. The rare part is the domain — most frontend portfolios cannot
truthfully claim production data visualization at that scale, for that kind of client.

This is the lead. His earlier decade in audit, project management, and operational analysis (Ernst &
Young, VEON Beeline, Russian Railways) and his breadth of shipped side projects are real and documented,
but they are supporting evidence, not the headline.

## Operating Context

- Visitors arrive cold, most often from a LinkedIn profile link or a CV, on the strength of a job
  application. There is no funnel before the site and no logged-in state after it.
- The whole evaluation is a single page. Everything a visitor needs must be reachable by scrolling one
  route or by following an outbound link.
- Screening happens on both desktop and phone; the phone case is a recruiter between other tasks.
- Every claim is expected to be verifiable one click away: employer sites, `francecompetences.fr`
  certification records, GitHub repositories, live deployments, and the CV PDF.
- The final artifact of a successful visit lives outside the site: a downloaded CV, a Telegram or
  WhatsApp message, or an email delivered through the contact form.

## Capabilities and Constraints

**What it does today.** One page, served in two languages (`/` in English, `/fr` in French), renders in
order: sticky nav, hero, skills & technologies, experience timeline, projects, contact, footer, plus a
floating back-to-top control. Category filters narrow the technology orbit and the projects grid. The
hero downloads the CV PDF. The contact section renders a location, two messenger QR codes and a form;
the social links live in the footer.

**Technical constraints.**

- Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4 with CSS-first configuration,
  shadcn/ui on Radix, Framer Motion as the single animation runtime. Deployed on Vercel.
- No authentication, no database, no upstream API, no route handler. The only network call is a
  client-side EmailJS send from `src/components/Contact.tsx`. Introducing any of those is a decision for
  the owner, not an implementation detail. `src/proxy.ts` exists, but only to negotiate the visitor's
  locale.
- Every environment variable is `NEXT_PUBLIC_*` and therefore inlined into the client bundle. Nothing
  secret can be added.
- Content is split in two by translatability. `src/constants/{experiences,projects,technologies}.ts` and
  `src/components/banner-content.ts` hold the parts that never translate — company names, project names,
  technology names, URLs, entry keys — as values only. All prose lives in
  `src/i18n/messages/{en,fr}.json`, keyed by the same entry key.
- Contact delivery depends on a third party (EmailJS) that can fail from the browser; the form's failure
  path is part of the product, not an edge case.

**Explicitly undecided.**

- **A third language.** English and French shipped on 2026-07-30; the French market need is met.
  Russian remains a possibility, not a commitment, and is not scheduled. Adding one means a locale in
  `src/i18n/routing.ts` and a third catalogue — the architecture does not otherwise constrain it.
- `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_CONTACT_PHONE` exist in `.env.local` but no code reads
  them. Whether the site should display a direct email or phone number is unresolved; do not assume it
  does.

## Brand Commitments

- The name is rendered **Stanislav Krivtsoff** in the site's own voice (the CV and some records use the
  transliteration *Krivtsov*); the domain is `krivtsoff.online`.
- Voice is first person, plain, and understated — it states what he built and lets the links prove it.
  No superlatives about himself, no invented enthusiasm.
- Real assets in `public/`: the avatar photograph, the CV PDF, Telegram and WhatsApp QR codes, nine
  project screenshots, technology logos.
- All copy is English (a repository-wide rule) until localization is actually decided.

## Evidence on Hand

**Real and verifiable — never replace with placeholders.**

- Four experience entries in `src/constants/experiences.ts`, each with a linked institution: Quantcube
  Technology (Sept 2023 – present, Paris), École 42 (Apr 2021 – Feb 2026, Paris), the 2011–2021
  management decade across Ernst & Young / VEON Beeline / Russian Railways, and HSE Moscow (2005–2011,
  Master's in Project Management, Bachelor's in Strategic Management).
- **Certifications are load-bearing proof and must stay prominent and verifiable.** Three RNCP records,
  each with a `francecompetences.fr` URL: *Expert en Architecture Informatique — Architecture de Données*
  (RNCP 7, Master's equivalent, Feb 2026), and two RNCP 6 *Concepteur Développeur de Solutions
  Informatiques* titles (Oct 2025, Nov 2024). These links must never be broken, buried, or paraphrased
  into an unverifiable claim.
- Nine shipped projects in `src/constants/projects.ts`, each with a live URL, a GitHub URL, a screenshot,
  and an honest description — including the caveat that Hypertube's torrent streaming only works in a
  local deployment. That kind of caveat is a feature of the voice; keep it.
- The four hero counters are confirmed accurate as stated: 30+ projects completed, 3+ years experience,
  5000+ hours coded, 3 IT certifications.
- Availability is a confirmed fact: "Available for new opportunities" is true as written.
- Location is Paris, France.

**Absent — must not be fabricated.** There are no testimonials, no client or employer logos beyond
linked company names, no written case studies, no press coverage, no performance or business metrics from
the Quantcube platform beyond "40+ indicators", and no pricing or availability calendar. Future work
invents none of these.

## Product Principles

1. **Verifiability over assertion.** Every claim earns its place by linking to something a skeptical
   engineer can check. A claim that cannot be verified is cut, not softened.
2. **Two reading speeds, one page.** A recruiter's sixty-second skim and a tech lead's deep read happen
   on the same route. Role, level, location, availability, and contact must survive the skim; depth must
   be there for whoever keeps scrolling.
3. **The execution is the evidence.** For this audience the site's own craft is a work sample. Quality
   of implementation is a product requirement, not polish.
4. **Data visualization leads.** When something must be cut or subordinated, the Quantcube data-viz
   work outranks the career history and the side projects.
5. **Understatement, honestly caveated.** The voice states facts and admits limits (as the Hypertube
   entry does). It never oversells.

## Accessibility & Inclusion

No standard was contractually established. Two product-specific requirements hold: the audience judges
implementation quality, so accessibility failures read as craft failures; and `prefers-reduced-motion`
must be respected for every non-essential animation, which the current implementation already does.
