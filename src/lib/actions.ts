"use server";

import { signIn } from "./auth";
import { connectToDb } from "./connect";
import crypto from "crypto";
import { User } from "./models";
import nodemailer from "nodemailer";
import { getTranslations } from "next-intl/server";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import type { ImageType } from "@/components/ApplicationForm/ApplicationForm";

const WORK_EMAIL = "selyanchyn45@gmail.com";

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

export const register = async (email: string) => {
  try {
    await connectToDb();

    const user = await User.findOne({ email });

    if (user) {
      return { error: "Email already taken" };
    }

    const newToken = crypto.randomBytes(32).toString("hex");
    const expiryDate = new Date(Date.now() + 3600000)
    await User.create({
      email,
      password: crypto.randomUUID().slice(0, 8).toUpperCase(),
      resetPasswordToken: newToken,
      resetPasswordTokenExpiry: expiryDate,
    });
    const subject = "Set your password";
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${newToken}`;
    const html = `Click <a href="${resetUrl}">here </a> to set your password`;
    await sendEmail(email, subject, html);
    return { success: true };
  } catch {
    return { error: "Something went wrong, try later" };
  }
};

interface AttachInterface {
  filename: string;
  path: string;
  cid?: string;
}

const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  attachments: AttachInterface[] = []
) => {
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
      attachments,
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
    const expiryDate = new Date(Date.now() + 3600000)
    user.resetPasswordToken = newToken;
    user.resetPasswordTokenExpiry = expiryDate;
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

const imageUpload = async (image: File): Promise<UploadApiResponse> => {
  if (!image) throw new Error("No image");
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "qaf" },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result as UploadApiResponse);
        }
      )
      .end(buffer);
  });
};

export const createApplication = async (
  formData: FormData,
  files: ImageType[]
) => {
  const newSize = files.reduce(
    (sum, image) =>
      sum + parseFloat((image.file.size / (1024 * 1024)).toFixed(2)),
    0
  );
  if (newSize > 8) {
    //NEXT.CONFIG.TS BODYSIZE LIMIT
    return false;
  }
  const name = formData.get("name") as string;
  const contact = formData.get("contact") as string;
  const device = formData.get("device") as string;
  const description = formData.get("description") as string;

  const imageUrls: string[] = [];

  for (const image of files) {
    try {
      const res = await imageUpload(image.file);
      imageUrls.push(res.secure_url);
    } catch {
      console.log("Image upload failed for one of the images");
    }
  }

  const html = `New application has been submitted!<br>
  From: ${name}<br>
  Contact: ${contact}<br>
  Device type: ${device}<br>
  Description: ${description}<br>
  Attached files: ${files.length}
  `;

  const attachments: AttachInterface[] = imageUrls.map((url, index) => ({
    filename: `image-${index + 1}.jpg`,
    path: url,
  }));

  try {
    const res = await sendEmail(
      WORK_EMAIL,
      "New Application",
      html,
      attachments
    );
    return res;
  } catch {
    return false;
  } finally {
    const result = await cloudinary.api.delete_resources_by_prefix("qaf/");
    console.log("Result of delition qaf: ", result);
  }
};
