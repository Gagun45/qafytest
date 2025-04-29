import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./connect";
import { User } from "./models";
import type { Session } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      name: "Credentials",
      async authorize(credentials) {
        try {
          await connectToDb();

          const user = await User.findOne({ email: credentials.email });

          return {
            email: user.email,
            isAdmin: user.isAdmin,
          };
        } catch (error) {
          console.log("authorize error", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.email = user.email!;
      }
      return token;
    },
    async session({ session }: { session: Session }) {
      await connectToDb();

      const dbUser = await User.findOne({ email: session.user.email });

      const filteredSession = {
        ...session,
        user: {
          email: dbUser.email,
          isAdmin: dbUser.isAdmin,
        },
      };
      return filteredSession;
    },
    async signIn({ user }) {
      try {
        await connectToDb();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const password = crypto.randomUUID().slice(0, 8).toUpperCase();
          await User.create({
            email: user.email,
            password,
          });
        }
        return true;
      } catch (err) {
        console.log("Sign in callback error: ", err);
        return false;
      }
    },
  },
});
