import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectToDb } from "./connect";
import { User } from "./models";
import type { Session } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {
    async signIn({ user }) {
      try {
        await connectToDb();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            isAdmin: false,
          });
        }
        return true;
      } catch (err) {
        console.log("Sign in callback error: ", err);
        return false;
      }
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
  },
});
