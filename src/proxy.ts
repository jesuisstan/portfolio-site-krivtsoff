import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

// `proxy.ts` is what this file convention is called from Next.js 16 on; `middleware.ts` still works
// but logs a deprecation warning. The next-intl import path is unchanged.
const proxy = createMiddleware(routing);

// Anything with a file extension is served from `public/` (CV PDF, favicons, images,
// QR codes) and must reach the visitor unrewritten.
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

export default proxy;
