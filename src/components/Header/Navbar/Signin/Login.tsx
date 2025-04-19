"use client";

import { useTranslations } from "next-intl";
import type { LinkInterface } from "../Navbar";
import NavLink from "../NavLink/NavLink";

export default function Login() {
  const t = useTranslations("NavBarLinks");
  const link: LinkInterface = { title: t("Login"), path: "/login" };
  return <NavLink link={link} />;
}
