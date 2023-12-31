import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from 'nanoid';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/libs/db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.accountId = token.accountId;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (!dbUser.accountId) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            accountId: nanoid(10),
          },
        });
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        accountId: dbUser.accountId,
      };
    },

    redirect() {
      return '/dashboard';
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
