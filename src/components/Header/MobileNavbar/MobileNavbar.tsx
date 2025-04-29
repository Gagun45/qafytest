"use client";

import { useState } from "react";
import type { LinkInterface } from "../Navbar/Navbar";
import MobileLink from "./MobileLink";
import { signOut, useSession } from "next-auth/react";
import Theme from "../Theme/Theme";
import LocaleSwitcherPhone from "@/components/LocaleSwitcher/LocaleSwitcherPhone";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const t = useTranslations("NavBarLinks");
  const LINKS: LinkInterface[] = [
    { title: t("Home"), path: "/" },
    { title: t("Services"), path: "/services" },
    { title: t("Application"), path: "/application" },
    { title: t("Contacts"), path: "/contacts" },
  ];

  return (
    <div className="flex lg:hidden items-center z-40">
      <div
        className="flex flex-col h-6 gap-1.5 cursor-pointer z-0"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="h-1 bg-text w-10 rounded-full"></div>
        <div className="h-1 bg-text w-10 rounded-full"></div>
        <div className="h-1 bg-text w-10 rounded-full"></div>
      </div>
      {open && (
        <FontAwesomeIcon
          icon={faXmark}
          className="text-5xl z-50 fixed top-8 right-5 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        />
      )}
      {open && (
        <div className="w-[100vw] h-[100vh] fixed top-0 right-0 bg-headfoot flex flex-col text-2xl gap-8 justify-center items-center">
          {LINKS.map((link) => (
            <MobileLink
              onClick={() => setOpen((prev) => !prev)}
              key={link.path}
              link={link}
            />
          ))}
          {!session && (
            <MobileLink
              onClick={() => setOpen((prev) => !prev)}
              key="/login"
              link={{ path: "/login", title: t("Login") }}
            />
          )}
          {session && (
            <button
              className="navLink w-full rounded-none h-12"
              onClick={() => signOut()}
            >
              {t("Logout")}
            </button>
          )}
          <Theme />
          <LocaleSwitcherPhone />
        </div>
      )}
    </div>
  );
}
