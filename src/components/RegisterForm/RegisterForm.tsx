"use client";

import styles from "./RegisterForm.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/actions";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (password.length > 24) {
      setPassword(password.slice(0, 25));
    }

    if (passwordConfirm.length > 24) {
      setPasswordConfirm(passwordConfirm.slice(0, 25));
    }
    if (password === passwordConfirm) {
      setError("");
      setIsDisabled(false);
    }
    if (password && passwordConfirm && password !== passwordConfirm) {
      setError("Passwords dont match");
      setIsDisabled(true);
    }
    if (!password || !passwordConfirm) {
      setError("");
      setIsDisabled(true);
    }
    if (password && password.length < 8) {
      setError("Password must be at least 8 symbols long");
      setIsDisabled(true);
    }
  }, [password, passwordConfirm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) return;
    const result = await register(email, password);
    if (result.error) {
      if (result.error === "Email already taken") {
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setResponse(`Email ${email} already taken`);
      } else {
        setResponse(result.error);
      }
    }
    if (result.success) {
      router.push("/login");
    }
  };

  return (
    <div className="w-4/5 max-w-[325px] flex flex-col gap-[30px]">
      <h1 className="text-center font-bold text-2xl">Register</h1>
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
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="password repeat"
          name="passwordConfirm"
        />
        <span>{error}</span>
        <span>{response}</span>
        <button disabled={isDisabled} className={styles.button}>
          Register
        </button>
        <div>
          {"Already have an account? "}
          <Link href="/login">
            <b>Login</b>
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
