"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { LinkInterface } from "../Navbar/Navbar";
import MobileLink from "./MobileLink";

const LINKS: LinkInterface[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex sm:hidden items-center gap-2 justify-end h-full w-1/2 bg-amber-400">
      <FontAwesomeIcon
        onClick={() => setOpen((prev) => !prev)}
        icon={faHamburger}
        className="z-10"
      />
      {open && (
        <div className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-amber-950 flex flex-col justify-center items-center">
          {LINKS.map((link) => (
            <MobileLink
              onClick={() => setOpen((prev) => !prev)}
              key={link.path}
              link={link}
            />
          ))}
        </div>
      )}
    </div>
  );
}
