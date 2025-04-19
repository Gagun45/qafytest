"use client";

import { useEffect, useState } from "react";
import styles from "./Reset.module.css";
import { resetPassword } from "@/lib/actions";
import Link from "next/link";

export default function Reset({ email }: { email: string }) {
  const [password, setPassword] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  const [isPassSet, setIsPassSet] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (password) setIsDisabled(false);
    else setIsDisabled(true);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await resetPassword(email, password);
    if (res === "Success") setIsPassSet(true);
    else setError(res);
  };

  if (isPassSet)
    return (
      <main>
        Password successfully set. Return to <Link href="/login">Login</Link>
      </main>
    );
  return (
    <div className="w-full max-w-[325px] flex flex-col gap-[30px]">
      <h1 className="text-center font-bold text-2xl">Forgot password</h1>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          name="password"
        />
        <span>{error}</span>
        <button disabled={isDisabled} className={styles.button}>
          Set new password
        </button>
      </form>
    </div>
  );
}
