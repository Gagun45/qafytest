"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import type { LinkInterface } from "../Navbar";

export default function NavLink({ link }: { link: LinkInterface }) {
  const pathname = usePathname();
  const currentPage =
    link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
  return (
    <Link
      key={link.path}
      href={link.path}
      className={`${currentPage && "bg-main"} ${
        !currentPage && "hover:bg-third"
      } cursor-pointer  p-2`}
    >
      {link.title}
    </Link>
  );
}
