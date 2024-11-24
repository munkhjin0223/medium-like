import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@auth/prisma-adapter';
import client from '@/lib/prisma';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    }),
  ],
  adapter: PrismaAdapter(client),
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
} as NextAuthConfig;
