"use client";

import type { LinkInterface } from "../Navbar";
import { Link, usePathname } from "@/i18n/navigation";

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
