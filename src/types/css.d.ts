// Next.js ships no ambient declaration for stylesheet imports, so a side-effect import such as
// `import '@/styles/globals.css'` has no type. Without this, any type-checker running with
// `noUncheckedSideEffectImports` reports TS2307 on it — including editors whose bundled TypeScript
// enables that check by default.
declare module '*.css';
