#!/usr/bin/env node
/**
 * Regenerates the machine-readable layer of the design system from
 * `src/styles/globals.css`, which is the single source of every token value:
 *
 *   src/styles/globals.css  ->  DESIGN.md (YAML frontmatter only)
 *                           ->  .impeccable/design.json (extensions only)
 *
 * The prose body of DESIGN.md and the hand-authored parts of the sidecar
 * (`components`, `narrative`, typography purposes, colour display names) are
 * preserved untouched — they carry judgement, not data.
 *
 * Usage: node scripts/design-sync.mjs [--check]
 *        --check exits 1 when the generated layer is stale instead of writing.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const CSS_PATH = join(ROOT, 'src/styles/globals.css');
const LAYOUT_PATH = join(ROOT, 'src/app/layout.tsx');
const DESIGN_PATH = join(ROOT, 'DESIGN.md');
const SIDECAR_PATH = join(ROOT, '.impeccable/design.json');

const CHECK_ONLY = process.argv.includes('--check');

/** Root font size the px conversions assume; nothing in the project overrides it. */
const ROOT_FONT_PX = 16;

// Declared by `shadcn init` but referenced nowhere under src/. Documenting them
// would describe a system this site does not have.
const UNUSED_TOKEN = /^(chart-\d|sidebar)/;

// Role grouping for the colour tokens, in the order DESIGN.md presents them.
const COLOR_ROLES = [
  ['primary', ['primary', 'primary-foreground', 'ring']],
  ['secondary', ['primary-alt', 'primary-alt-foreground']],
  ['tertiary', ['accent', 'accent-foreground']],
  [
    'neutral',
    [
      'background',
      'foreground',
      'card',
      'card-foreground',
      'popover',
      'popover-foreground',
      'secondary',
      'secondary-foreground',
      'muted',
      'muted-foreground',
      'border',
      'input',
      'overlay',
      'logo-plate',
      'logo-plate-dark'
    ]
  ],
  ['danger', ['destructive', 'destructive-foreground']],
  ['brand', ['brand-telegram', 'brand-whatsapp']]
];

// Tailwind v4 defaults. The project has no `--breakpoint-*` override and no
// config file, so these are framework facts rather than project values.
const TAILWIND_BREAKPOINTS = [
  { name: 'sm', value: '640px' },
  { name: 'md', value: '768px' },
  { name: 'lg', value: '1024px' },
  { name: 'xl', value: '1280px' },
  { name: '2xl', value: '1536px' }
];

/**
 * Extracts the body of the first CSS block whose opening line matches a pattern.
 * @param {string} css Stylesheet source.
 * @param {RegExp} pattern Anchored pattern matching the selector and its `{`.
 * @returns {string} Block body, or an empty string when the block is absent.
 */
const extractBlock = (css, pattern) => {
  const match = pattern.exec(css);
  if (!match) return '';

  let depth = 0;
  for (let i = css.indexOf('{', match.index); i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}' && --depth === 0) {
      return css.slice(css.indexOf('{', match.index) + 1, i);
    }
  }
  return '';
};

/**
 * Collects the custom properties declared directly in a CSS block body.
 * @param {string} block Block body.
 * @returns {Record<string, string>} Property name (without `--`) to value.
 */
const parseCustomProperties = (block) => {
  const props = {};
  const declaration = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = declaration.exec(block)) !== null) {
    props[match[1]] = match[2].trim().replace(/\s+/g, ' ');
  }
  return props;
};

/**
 * Substitutes `var(--x)` references using the given lookup tables, nearest first.
 * @param {string} value Raw CSS value.
 * @param {Record<string, string>[]} tables Lookup tables in priority order.
 * @returns {string} Value with resolvable references replaced.
 */
const resolveReferences = (value, tables) => {
  let resolved = value;
  for (let pass = 0; pass < 4 && resolved.includes('var(--'); pass++) {
    resolved = resolved.replace(/var\(--([\w-]+)\)/g, (whole, name) => {
      const table = tables.find((candidate) => name in candidate);
      return table ? table[name] : whole;
    });
  }
  return resolved;
};

/**
 * Reduces a length or a single-operation `calc()` of two lengths to pixels.
 * @param {string} value CSS length or `calc()` expression.
 * @returns {string} Pixel value, or the input when it is not reducible.
 */
const toPixels = (value) => {
  const length = (raw) => {
    if (raw.endsWith('rem')) return parseFloat(raw) * ROOT_FONT_PX;
    if (raw.endsWith('px')) return parseFloat(raw);
    return null;
  };

  const calc =
    /^calc\(\s*([\d.]+(?:rem|px))\s*([+-])\s*([\d.]+(?:rem|px))\s*\)$/.exec(
      value
    );
  if (!calc) {
    const plain = length(value);
    return plain === null ? value : `${plain}px`;
  }

  const left = length(calc[1]);
  const right = length(calc[3]);
  if (left === null || right === null) return value;
  return `${calc[2] === '+' ? left + right : left - right}px`;
};

/** Title-cases a token name for use as a fallback display name. */
const titleCase = (token) =>
  token
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

/**
 * Builds an 8-step lightness ramp around an OKLCH colour, dark to light.
 * @param {string} value An `oklch(L C H)` value.
 * @returns {string[]} Eight OKLCH strings, or an empty array when unparseable.
 */
const tonalRamp = (value) => {
  const parsed = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/.exec(value);
  if (!parsed) return [];

  const [chroma, hue] = [parsed[2], parsed[3]];
  return Array.from({ length: 8 }, (unused, step) => {
    const lightness = (0.15 + (step * (0.95 - 0.15)) / 7).toFixed(3);
    return `oklch(${lightness} ${chroma} ${hue})`;
  });
};

/** Serializes a flat string map as a two-space-indented YAML block. */
const toYamlMap = (entries, indent = '  ') =>
  entries.map(([key, value]) => `${indent}${key}: "${value}"`).join('\n');

const css = readFileSync(CSS_PATH, 'utf8');

const light = parseCustomProperties(extractBlock(css, /^:root\s*\{/m));
const dark = parseCustomProperties(extractBlock(css, /^\.dark\s*\{/m));
const themeInline = parseCustomProperties(
  extractBlock(css, /^@theme inline\s*\{/m)
);
const theme = parseCustomProperties(extractBlock(css, /^@theme\s*\{/m));

if (!Object.keys(light).length) {
  console.error(`design-sync: no :root custom properties found in ${CSS_PATH}`);
  process.exit(1);
}

// --- Colours -----------------------------------------------------------------

const colorTokens = Object.keys(light).filter(
  (token) =>
    !UNUSED_TOKEN.test(token) &&
    !token.startsWith('elevation-') &&
    token !== 'radius'
);

const roleOf = (token) => {
  const role = COLOR_ROLES.find(([, tokens]) => tokens.includes(token));
  if (role) return role[0];
  console.warn(`design-sync: no role mapped for --${token}, filing as neutral`);
  return 'neutral';
};

const orderedColors = [
  ...COLOR_ROLES.flatMap(([, tokens]) =>
    tokens.filter((token) => colorTokens.includes(token))
  ),
  ...colorTokens.filter(
    (token) => !COLOR_ROLES.some(([, tokens]) => tokens.includes(token))
  )
];

// --- Radius ------------------------------------------------------------------

const radiusSteps = Object.entries(themeInline)
  .filter(([name]) => name.startsWith('radius-'))
  .map(([name, value]) => [
    name.replace('radius-', ''),
    toPixels(resolveReferences(value, [light]))
  ]);

// --- Elevation ---------------------------------------------------------------

const shadowSteps = Object.entries(themeInline)
  .filter(([name]) => name.startsWith('shadow-'))
  .map(([name, value]) => {
    const reference = /var\(--([\w-]+)\)/.exec(value);
    const token = reference ? reference[1] : null;
    return {
      name: name.replace('shadow-', ''),
      utility: `shadow-${name.replace('shadow-', '')}`,
      light: token && token in light ? light[token] : value,
      dark: token && token in dark ? dark[token] : null
    };
  });

// --- Motion ------------------------------------------------------------------

const motionSteps = [...Object.entries(theme), ...Object.entries(themeInline)]
  .filter(([name]) => name.startsWith('animate-'))
  .map(([name, value]) => ({
    name: name.replace('animate-', ''),
    utility: name.replace('animate-', 'animate-'),
    value
  }));

// --- Typography --------------------------------------------------------------

const layout = existsSync(LAYOUT_PATH) ? readFileSync(LAYOUT_PATH, 'utf8') : '';
const fontMatch = /(\w+)\(\{\s*subsets:/.exec(layout);
const fontFamily = fontMatch ? `${fontMatch[1]}, sans-serif` : null;

// --- Write DESIGN.md frontmatter --------------------------------------------

if (!existsSync(DESIGN_PATH)) {
  console.error(
    'design-sync: DESIGN.md is missing. Run /impeccable document to write its prose first.'
  );
  process.exit(1);
}

const designSource = readFileSync(DESIGN_PATH, 'utf8');
const frontmatterMatch = /^---\n([\s\S]*?)\n---\n/.exec(designSource);
if (!frontmatterMatch) {
  console.error(
    'design-sync: DESIGN.md has no YAML frontmatter block to replace.'
  );
  process.exit(1);
}

const preserved = (key, fallback) => {
  const line = new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(frontmatterMatch[1]);
  return line ? line[1].trim() : fallback;
};

const frontmatter = [
  '---',
  '# Generated by `npm run design:sync` from src/styles/globals.css.',
  '# Edit the tokens there, never here. Prose below the block is hand-written.',
  `name: ${preserved('name', 'Portfolio')}`,
  `description: ${preserved('description', 'Design system')}`,
  'colors:',
  toYamlMap(orderedColors.map((token) => [token, light[token]])),
  'rounded:',
  toYamlMap(radiusSteps),
  '---',
  ''
].join('\n');

const nextDesign = designSource.replace(frontmatterMatch[0], frontmatter);

// --- Build the sidecar -------------------------------------------------------

const existingSidecar = existsSync(SIDECAR_PATH)
  ? JSON.parse(readFileSync(SIDECAR_PATH, 'utf8'))
  : {};
const existingColorMeta = existingSidecar.extensions?.colorMeta ?? {};

const colorMeta = Object.fromEntries(
  orderedColors.map((token) => {
    const entry = {
      role: roleOf(token),
      displayName: existingColorMeta[token]?.displayName ?? titleCase(token),
      canonical: light[token],
      tonalRamp: tonalRamp(light[token])
    };
    if (token in dark && dark[token] !== light[token]) entry.dark = dark[token];
    return [token, entry];
  })
);

const payload = {
  schemaVersion: 2,
  title: existingSidecar.title ?? 'Design System',
  extensions: {
    colorMeta,
    typographyMeta: existingSidecar.extensions?.typographyMeta ?? {},
    fontFamily,
    shadows: shadowSteps,
    motion: motionSteps,
    breakpoints: TAILWIND_BREAKPOINTS
  },
  components: existingSidecar.components ?? [],
  narrative: existingSidecar.narrative ?? {}
};

// Only stamp a new timestamp when something else actually changed, so `--check`
// stays meaningful and repeated runs are no-ops.
const withoutStamp = (sidecar) => {
  const { generatedAt, ...rest } = sidecar;
  return JSON.stringify(rest);
};

const unchangedSidecar =
  withoutStamp(existingSidecar) === withoutStamp(payload);
const nextSidecar = `${JSON.stringify(
  {
    schemaVersion: payload.schemaVersion,
    generatedAt: unchangedSidecar
      ? (existingSidecar.generatedAt ?? new Date().toISOString())
      : new Date().toISOString(),
    ...payload
  },
  null,
  2
)}\n`;

// --- Emit --------------------------------------------------------------------

const designStale = nextDesign !== designSource;
const sidecarStale = !existsSync(SIDECAR_PATH) || !unchangedSidecar;

if (CHECK_ONLY) {
  if (designStale)
    console.error('design-sync: ‼️ DESIGN.md frontmatter is stale.');
  if (sidecarStale)
    console.error('design-sync: ‼️ .impeccable/design.json is stale.');
  if (designStale || sidecarStale) {
    console.error('design-sync: ⚠️ run `npm run design:sync`.');
    process.exit(1);
  }
  console.log('design-sync: ✅ generated layer is up to date.');
  process.exit(0);
}

if (designStale) writeFileSync(DESIGN_PATH, nextDesign);
mkdirSync(dirname(SIDECAR_PATH), { recursive: true });
// Always rewritten, even when the bytes are identical: the design hook compares mtimes and
// warns when DESIGN.md is newer than its sidecar, so editing prose must be clearable by
// re-running this script. Identical content means no git churn.
writeFileSync(SIDECAR_PATH, nextSidecar);

console.log(
  `design-sync: ${orderedColors.length} colors, ${radiusSteps.length} radii, ` +
    `${shadowSteps.length} elevation steps, ${motionSteps.length} motion tokens` +
    `${designStale || sidecarStale ? ' written.' : ' already current.'}`
);
