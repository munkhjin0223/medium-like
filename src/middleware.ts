import { auth } from '@/lib/auth';
import { NextRequest } from 'next/server';

export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
});

export const config = { matcher: ['/user/:path*', '/api/user/:path*'] };
