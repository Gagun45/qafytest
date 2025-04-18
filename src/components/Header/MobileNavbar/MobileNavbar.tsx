"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { LinkInterface } from "../Navbar/Navbar";
import MobileLink from "./MobileLink";
import { signOut, useSession } from "next-auth/react";
import Theme from "../Theme/Theme";

const LINKS: LinkInterface[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="flex sm:hidden items-center gap-2 justify-end h-full w-full">
      <FontAwesomeIcon
        onClick={() => setOpen((prev) => !prev)}
        icon={faHamburger}
        className="z-10"
      />
      {open && (
        <div className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-amber-950 flex flex-col gap-2 justify-center items-center">
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
        </div>
      )}
    </div>
  );
}
