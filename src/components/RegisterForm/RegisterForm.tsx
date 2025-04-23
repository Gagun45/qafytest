"use client";

import styles from "./RegisterForm.module.css";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/actions";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function RegisterForm() {
  const t = useTranslations("RegisterPage");
  const smthWentWrong = useTranslations("smthWentWrong");
  const emailTaken = t("emailTaken");

  const successMessage = t("success");

  const [email, setEmail] = useState("");

  const [response, setResponse] = useState("");

  const [beingSend, setBeingSend] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setError("");
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsPending(true);
      setError("");
      e.preventDefault();
      const result = await register(email);
      if (result.error) {
        if (result.error === "Email already taken") {
          setError(emailTaken);
        } else {
          setResponse(result.error);
        }
      }
      if (result.success) {
        setError("");
        setSuccess(successMessage);
        setIsPending(true);
        setBeingSend(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch {
      setError("");
      setEmail("");
      setSuccess("");
      setResponse(smthWentWrong);
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-4/5 max-w-[325px] flex flex-col gap-[30px]">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-center text-4xl md:text-6xl">{t("title")}</h1>
        <h2 className="text-sm md:text-base">{t("subtitle")}</h2>
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
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}
        {response && <span>{response}</span>}
        <button
          disabled={!email || beingSend || isPending}
          className={styles.button}
        >
          {isPending ? t("pending") : t("title")}
        </button>
        <div>
          {t("alreadyAcc")}{" "}
          <Link href="/login" className="underline underline-offset-2">
            <b>{t("login")}</b>
          </Link>
        </div>
      </form>
      <button
        disabled={isPending || beingSend}
        className={styles.button}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        {t("google")}
      </button>
    </div>
  );
}
