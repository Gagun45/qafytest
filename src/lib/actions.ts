"use server";

import { signIn } from "./auth";
import { connectToDb } from "./connect";
import { User } from "./models";

export const login = async (email: string, password: string) => {
  try {
    await connectToDb();
    const user = await User.findOne({ email });
    if (!user) throw new Error("Wrong email");
    const isMatch = password === user.password;
    if (!isMatch) throw new Error("Wrong password");
    await signIn("credentials", {
      email,
      password,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NEXT_REDIRECT") {
        return { success: true };
      }
      console.log("ERROR MESSSSAAGE:", error.message);
      return { error: error.message };
    }
    throw new Error("Unknown error");
  }
};

export const register = async (email: string, password: string) => {
  try {
    await connectToDb();

    const user = await User.findOne({ email });

    if (user) {
      return { error: "Email already taken" };
    }

    await User.create({
      email,
      password,
    });
    return { success: true };
  } catch (err) {
    console.log("Registration error: ", err);
    return { error: "Something went wrong, try later" };
  }
};
