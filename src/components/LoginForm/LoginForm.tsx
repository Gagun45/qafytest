"use client";

import styles from "./LoginForm.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { login } from "@/lib/actions";
import { useRouter } from "@/i18n/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);
  const { update } = useSession();

  const router = useRouter();

  useEffect(() => {
    setError("");
    if (!email || !password || password.length < 8) {
      setIsDisabled(true);
    } else setIsDisabled(false);
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {

      setError("");
      e.preventDefault();
      const result = await login(email, password);
      if (result.error) {
        setError(result.error);
      }
      if (result.success) {
        router.push("/");
        await update();
      }
    } catch {
      setError('Something went wrong')
    }
  };

  return (
    <div className="w-4/5 max-w-[325px] flex flex-col gap-[30px]">
      <h1 className="text-center font-bold text-2xl">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          name="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          name="password"
        />
        {error && <span>{error}</span>}
        <button disabled={isDisabled} className={styles.button}>
          Login
        </button>
        <div>
          {"Dont have an account? "}
          <Link href="/register" className="underline underline-offset-2">
            <b>Register</b>
          </Link>
        </div>
        <div>
          <Link
            href="/forgot-password"
            className="underline underline-offset-2"
          >
            <b>Forgot password?</b>
          </Link>
        </div>
      </form>
      <button
        className={styles.button}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Login via Google
      </button>
    </div>
  );
}
