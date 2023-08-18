import { nextOptions } from '@/lib/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(nextOptions);

export { handler as GET, handler as POST };
