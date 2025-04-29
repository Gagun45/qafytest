"use client";

import styles from "../Forms.module.css";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { login } from "@/lib/actions";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("LoginPage");
  const smthWentWrong = useTranslations()("smthWentWrong");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const [isPending, setIsPending] = useState(false);
  const { update } = useSession();

  const router = useRouter();
  useEffect(() => {
    const disabled =
      !email || !password || password.length < 8 || password.length > 24;
    setIsDisabled(disabled);
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsPending(true);
      setError("");
      e.preventDefault();
      const result = await login(email, password);
      if (result.success) {
        router.push("/");
        await update();
      }
      if (result.error) {
        setError(result.error);
        setPassword("");
      }
    } catch {
      setError(smthWentWrong);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section>
      <div className="mainHeading">
        <h1 className="pageTitle">{t("title")}</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email")}
          name="email"
        />
        <div className="relative">
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("password")}
            name="password"
          />
          {password && (
            <span
              className={`${
                password && (password.length < 8 || password.length > 24)
                  ? "text-red-600"
                  : "text-green-700"
              } ${
                password ? "" : "text-text"
              } absolute bottom-0 translate-y-full left-0 text-xs`}
            >
              {t("PASSWORD_LENGTH_WARNING")}
            </span>
          )}
        </div>

        {error && <span>{error}</span>}
        <button
          type="submit"
          disabled={isDisabled || isPending}
          className={styles.button}
        >
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
        <button
          type="button"
          disabled={isPending}
          className={styles.button}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          {t("google")}
        </button>
      </form>
    </section>
  );
}
