'use client';

import Error from 'next/error';

/** Bare 404 for requests the locale middleware does not match. */
const NotFound = () => (
  <html lang="en">
    <body>
      <Error statusCode={404} />
    </body>
  </html>
);

export default NotFound;
