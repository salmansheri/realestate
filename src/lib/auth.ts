import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcryptjs from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email as string,
          },
        });

        if (!user || !user?.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcryptjs.compare(
          credentials.password as string,
          user.password,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid Password ");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.id;
      }
      return token;
    },
  },
});
