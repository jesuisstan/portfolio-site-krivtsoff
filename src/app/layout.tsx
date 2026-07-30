import type { ReactNode } from 'react';

// The document shell lives in `[locale]/layout.tsx`; Next.js only requires this file to exist
// because a root `not-found.tsx` is present for requests that carry no locale.
const RootLayout = ({ children }: { children: ReactNode }) => children;

export default RootLayout;
