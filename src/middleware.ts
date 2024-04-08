import { PzNextRequest, withPzDefault } from '@akinon/next/middlewares';
import { NextFetchEvent, NextMiddleware, NextResponse } from 'next/server';

/**
 * !IMPORTANT
 * Do not remove this file or withPzDefault middleware.
 * It is required for the application to work properly.
 * If you need to add custom matcher, don't remove the existing one.
 */

export const config = {
  matcher: [
    '/((?!api|_next|[\\w-\\/*]+\\.\\w+).*)',
    '/(.*sitemap\\.xml)',
    '/(.+\\.)(html|htm|aspx|asp|php)'
  ]
};

const middleware: NextMiddleware = (
  req: PzNextRequest,
  event: NextFetchEvent
) => {
  // If you use a custom response such as NextResponse.json(),
  // you should set pz-override-response header to true as shown below.
  // Otherwise, you'll get a 404 error.

  // Example:
  // return NextResponse.json({ status: 'ok' }, { headers: { 'pz-override-response': 'true' } });

  return NextResponse.next();
};

export default withPzDefault(middleware);
