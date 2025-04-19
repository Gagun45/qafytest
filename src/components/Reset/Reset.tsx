"use client";

import { useEffect, useState } from "react";
import styles from "./Reset.module.css";
import { resetPassword } from "@/lib/actions";
import Rssuccess from "./Rssuccess";

export default function Reset({ email }: { email: string }) {
  const [password, setPassword] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  const [isPassSet, setIsPassSet] = useState(false);

  const [error, setError] = useState("");

  const passwordValidation = () => {
    if (password.length > 24) {
      setPassword(password.slice(0, 25));
    }

    if (!password) {
      setError("");
    }
    if (password && password.length < 8) {
      setError("Password must be at least 8 symbols long");
    }
    if (password && password.length > 7 && password.length < 24) {
      setError("");
    }
  };

  useEffect(() => {
    passwordValidation();
    if (!password) setIsDisabled(true);
  }, [password]);

  useEffect(() => {
    if (!password) setIsDisabled(true);
    else if (error) setIsDisabled(true);
    else setIsDisabled(false);
  }, [error, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    setError("");
    e.preventDefault();
    const res = await resetPassword(email, password);
    if (res === "Success") setIsPassSet(true);
    else setError(res);
  };

  if (isPassSet) {
    return <Rssuccess />;
  }
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
        {error && <span>{error}</span>}
        <button disabled={isDisabled} className={styles.button}>
          Set new password
        </button>
      </form>
    </div>
  );
}
