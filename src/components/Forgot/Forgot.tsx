"use client";

import { useEffect, useState } from "react";
import styles from "./Forgot.module.css";
import { forgotPassword } from "@/lib/actions";
import Fgsuccess from "./Fgsuccess";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [status, setStatus] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsPending(true);
    e.preventDefault();
    setStatus("");
    const res = await forgotPassword(email);
    if (res === "Success") {
      setIsSend(true);
    } else setStatus(res);
    setIsPending(false);
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
      <h1 className="text-center font-bold text-2xl">Forgot password</h1>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          name="email"
        />
        <button disabled={isDisabled || isPending} className={styles.button}>
          {isPending ? "Processing..." : "Send reset link to email"}
        </button>
        <span>{status}</span>
      </form>
    </div>
  );
}
