"use client";

import { useEffect, useState } from "react";
import styles from "../Forms.module.css";
import { forgotPassword } from "@/lib/actions";
import Fgsuccess from "./Fgsuccess";
import { useTranslations } from "next-intl";

export default function Forgot() {
  const t = useTranslations("ForgotPage");
  const smthWentWrong = useTranslations("smthWentWrong");
  const noUser = t("noUser");
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [status, setStatus] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsPending(true);
      e.preventDefault();
      setStatus("");
      const res = await forgotPassword(email);
      if (res === "Success") {
        setIsSend(true);
      }
      if (res === "No user exists with such email") {
        setStatus(noUser);
      }
    } catch {
      setStatus(smthWentWrong);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (email) setIsDisabled(false);
    else setIsDisabled(true);
  }, [email]);

  if (isSend) {
    return <Fgsuccess email={email} />;
  }

  return (
    <section>
      <div className="mainHeading">
        <h1 className="pageTitle">{t("title")}</h1>
      </div>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email")}
          name="email"
        />
        <button disabled={isDisabled || isPending} className={styles.button}>
          {isPending ? t("pending") : t("send")}
        </button>
        <span>{status}</span>
      </form>
    </section>
  );
}
