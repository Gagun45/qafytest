"use client";

import { useEffect, useState } from "react";
import styles from "../Forms.module.css";
import { resetPassword } from "@/lib/actions";
import Rssuccess from "./Rssuccess";
import { useTranslations } from "next-intl";

export default function Reset({ email }: { email: string }) {
  const [password, setPassword] = useState("");

  const t = useTranslations("ResetPage");

  const smthWentWrong = useTranslations("smthWentWrong");

  const [isPassSet, setIsPassSet] = useState(false);

  const [error, setError] = useState("");

  const [isPending, setIsPending] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const disabled = !password || password.length < 8 || password.length > 24;
    setIsDisabled(disabled);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsPending(true);
      setError("");
      e.preventDefault();
      const res = await resetPassword(email, password);
      if (res === "Success") setIsPassSet(true);
    } catch {
      setError(smthWentWrong);
    } finally {
      setIsPending(false);
    }
  };

  if (isPassSet) {
    return <Rssuccess />;
  }
  return (
    <section>
      <div className="mainHeading">
        <h1 className="pageTitle">{t("title")}</h1>
      </div>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className="relative">
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("newPwd")}
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
        <button disabled={isDisabled || isPending} className={styles.button}>
          {isPending ? t("pending") : t("setNew")}
        </button>
      </form>
    </section>
  );
}
