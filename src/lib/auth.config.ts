import DiscordProvider from 'next-auth/providers/discord';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    }),
  ],
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
