import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@auth/prisma-adapter';
import client from '@/lib/prisma';

export const nextOptions = {
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
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
} as NextAuthOptions;

const handler = NextAuth(nextOptions);

export { handler as GET, handler as POST };
