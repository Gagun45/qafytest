"use client";

import { useEffect, useState } from "react";
import styles from "./Forgot.module.css";
import { forgotPassword } from "@/lib/actions";
import Fgsuccess from "./Fgsuccess";
import { useTranslations } from "next-intl";

export default function Forgot() {
  const t = useTranslations("ForgotPage");
  const smthWentWrong = useTranslations("smthWentWrong");
  const noUser = t('noUser')
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
      if (res === 'No user exists with such email') {
        setStatus(noUser)
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
    <div className="w-full max-w-[325px] flex flex-col gap-[30px]">
      <h1 className="text-center font-bold text-2xl">{t("title")}</h1>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
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
    </div>
  );
}
