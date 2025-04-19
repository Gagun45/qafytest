"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Logout() {
  const t = useTranslations("NavBarLinks");
  return (
    <button className="navLink" onClick={() => signOut()}>
      {t("Logout")}
    </button>
  );
}
