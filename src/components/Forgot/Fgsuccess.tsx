import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Fgsuccess({ email }: { email: string }) {
  const [countdown, setCountdown] = useState(5);

  const t = useTranslations("ForgotPage");

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/login");
    }
  }, [countdown]);

  return (
    <section className="items-start text-2xl md:text-4xl gap-24">
      <p>{t("success", { email })}</p>
      <p>{t("redirect", { countdown })}</p>
      <Link
        href="/login"
        className="underline underline-offset-2"
      >
        {t("goToLogin")}
      </Link>{" "}
    </section>
  );
}
