"use client";

import styles from "../Forms.module.css";
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
    <section>
      <div className="mainHeading">
        <h1 className="pageTitle">{t("title")}</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text-center">{t("subtitle")}</h2>
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
        <button
          type="button"
          disabled={isPending || beingSend}
          className={styles.button}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          {t("google")}
        </button>
      </form>
    </section>
  );
}
