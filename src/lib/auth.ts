import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import client from '@/lib/prisma';

export const { auth, handlers } = NextAuth({ ...authConfig, adapter: PrismaAdapter(client) });
