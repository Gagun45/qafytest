"use server";

import { signIn } from "./auth";
import { connectToDb } from "./connect";
import crypto from "crypto";
import { User } from "./models";
import nodemailer from "nodemailer";
import { getTranslations } from "next-intl/server";

export const login = async (email: string, password: string) => {
  const t = await getTranslations("LoginPage");
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
      if (error.message === "Wrong email") {
        return { error: t("wrongEmail") };
      }

      if (error.message === "Wrong password") {
        return { error: t("wrongPassword") };
      }
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
  } catch {
    return { error: "Something went wrong, try later" };
  }
};

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: `QAFY MOBILE ${process.env.GMAIL_EMAIL}`,
      to,
      subject,
      html,
    });
    return true;
  } catch {
    return false;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await connectToDb();
    const user = await User.findOne({ email });
    if (!user) return "No user exists with such email";
    const newToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = newToken;
    user.resetPasswordTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();

    const subject = "Reset your password";
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${newToken}`;
    const html = `Click <a href="${resetUrl}">here </a> to reset your password`;

    try {
      const res = await sendEmail(email, subject, html);
      if (!res) throw new Error("nodemailer Error");
    } catch {
      throw new Error("nodemailer Error");
    }

    return "Success";
  } catch (error) {
    if (error instanceof Error && error.message.includes("nodemailer Error"))
      return "Nodemail error, contact support please";
    return "Something went wrong";
  }
};

export const resetPassword = async (email: string, password: string) => {
  try {
    await connectToDb();

    const user = await User.findOne({ email });
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiry = null;
    user.save();
    return "Success";
  } catch {
    return "Something went wrong";
  }
};
