import NextAuth from 'next-auth';
import authConfig from '@/lib/auth.config';

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/signin') {
    const newUrl = new URL('/signin', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = { matcher: ['/user/:path*', '/api/user/:path*'] };
