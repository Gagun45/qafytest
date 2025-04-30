"use client";

import type { ReactNode } from "react";
import type { LinkInterface } from "../Navbar";
import { Link, usePathname } from "@/i18n/navigation";


export default function NavLink({
  link,
  children = null,
}: {
  link: LinkInterface;
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const currentPage =
    link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
  return (
    <Link href={link.path} className={`${currentPage && 'underline'} navLink`}>
      {children ? children : link.title}
    </Link>
  );
}
