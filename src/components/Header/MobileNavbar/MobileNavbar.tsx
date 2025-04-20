"use client";

import { useState } from "react";
import type { LinkInterface } from "../Navbar/Navbar";
import MobileLink from "./MobileLink";
import { signOut, useSession } from "next-auth/react";
import Theme from "../Theme/Theme";
import LocaleSwitcherPhone from "@/components/LocaleSwitcher/LocaleSwitcherPhone";

const LINKS: LinkInterface[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="flex md:hidden items-center">
      <div
        className="flex flex-col h-6 gap-1.5 cursor-pointer z-10"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="h-1 bg-text w-10 rounded-full"></div>
        <div className="h-1 bg-text w-10 rounded-full"></div>
        <div className="h-1 bg-text w-10 rounded-full"></div>
      </div>
      {open && (
        <div className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-headfoot flex flex-col text-2xl gap-8 justify-center items-center">
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
              link={{ path: "/login", title: "Login" }}
            />
          )}
          {session && (
            <button className="navLink" onClick={() => signOut()}>
              Logout
            </button>
          )}
          <Theme />
          <LocaleSwitcherPhone />
        </div>
      )}
    </div>
  );
}
