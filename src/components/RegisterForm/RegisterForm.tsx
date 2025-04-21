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

  const [passwordError, setPasswordError] = useState("");

  const [response, setResponse] = useState("");

  const [emailIsTaken, setEmailIsTaken] = useState("");

  const [isPending, setIsPending] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const router = useRouter();
  const passwordValidation = () => {
    if (password.length > 24) {
      setPassword(password.slice(0, 25));
    }

    if (passwordConfirm.length > 24) {
      setPasswordConfirm(passwordConfirm.slice(0, 25));
    }
    if (password === passwordConfirm) {
      setPasswordError("");
      setIsDisabled(false);
    }
    if (password && passwordConfirm && password !== passwordConfirm) {
      setPasswordError("Passwords dont match");
      setIsDisabled(true);
    }
    if (!password || !passwordConfirm) {
      setPasswordError("");
      setIsDisabled(true);
    }
    if (password && password.length < 8) {
      setPasswordError("Password must be at least 8 symbols long");
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    passwordValidation();
  }, [password, passwordConfirm]);
  useEffect(() => {
    setEmailIsTaken("");
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsPending(true);
      setEmailIsTaken("");
      setPasswordError("");
      e.preventDefault();
      if (password !== passwordConfirm) return;
      const result = await register(email, password);
      if (result.error) {
        if (result.error === "Email already taken") {
          setPassword("");
          setPasswordConfirm("");
          setEmailIsTaken(`Email ${email} already taken`);
        } else {
          setResponse(result.error);
        }
      }
      if (result.success) {
        router.push("/login");
      }
    } catch {
      setEmailIsTaken("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setPasswordError("");
      setIsDisabled(true);
      setResponse("Something went wrong");
    } finally {
      setIsPending(false);
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
        {emailIsTaken && <span>{emailIsTaken}</span>}
        {passwordError && <span>{passwordError}</span>}
        {response && <span>{response}</span>}
        <button disabled={isDisabled || isPending} className={styles.button}>
          {isPending ? "Registering..." : "Register"}
        </button>
        <div>
          {"Already have an account? "}
          <Link href="/login" className="underline underline-offset-2">
            <b>Login</b>
          </Link>
        </div>
      </form>
      <button
        disabled={isPending}
        className={styles.button}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Login via Google
      </button>
    </div>
  );
}
