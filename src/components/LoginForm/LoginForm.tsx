"use client";

import styles from "./LoginForm.module.css";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { login } from "@/lib/actions";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("LoginPage");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const { update } = useSession();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setIsDisabled(true);
    setIsPending(false);
  };

  const router = useRouter();

  useEffect(() => {
    setError("");
    if (!email || !password || password.length < 8) {
      setIsDisabled(true);
    } else setIsDisabled(false);
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsPending(true);
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
      setError("Something went wrong");
      resetForm();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-4/5 max-w-[325px] flex flex-col gap-[30px]">
      <h1 className="text-center font-bold text-2xl">{t("title")}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('email')}
          name="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('password')}
          name="password"
        />
        {error && <span>{error}</span>}
        <button disabled={isDisabled || isPending} className={styles.button}>
          {isPending ? t("pending") : t("title")}
        </button>
        <div>
          {t("noAcc")}{" "}
          <Link href="/register" className="underline underline-offset-2">
            <b>{t("register")}</b>
          </Link>
        </div>
        <div>
          <Link
            href="/forgot-password"
            className="underline underline-offset-2"
          >
            <b>{t("forgot")}</b>
          </Link>
        </div>
      </form>
      <button
        disabled={isPending}
        className={styles.button}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        {t("google")}
      </button>
    </div>
  );
}
