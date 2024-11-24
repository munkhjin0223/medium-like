import { auth } from '@/lib/auth';

export default auth((req) => {
  // `withAuth` augments your `Request` with the user's token.
  if (!req.auth && req.nextUrl.pathname !== '/signin') {
    const newUrl = new URL('/signin', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = { matcher: ['/user/:path*', '/api/user/:path*'] };
