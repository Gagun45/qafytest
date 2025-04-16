"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button className="navLink logBtn" onClick={() => signIn("google", { callbackUrl: "/" })}>
      Login via Google
    </button>
  );
}
