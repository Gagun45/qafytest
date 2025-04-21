"use client";

import Link from "next/link";

import type { LinkInterface } from "../Navbar";
import { usePathname } from "@/i18n/navigation";

export default function NavLink({ link }: { link: LinkInterface }) {
  const pathname = usePathname();
  const currentPage =
    link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
  return (
    <Link
      key={link.path}
      href={link.path}
      className={`${currentPage && "bg-main"} navLink`}
    >
      {link.title}
    </Link>
  );
}
