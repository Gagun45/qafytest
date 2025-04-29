"use client";

import { Link, usePathname } from "@/i18n/navigation";
import type { LinkInterface } from "../Navbar/Navbar";
import type { ReactNode } from "react";

export default function MobileLink({
  link,
  onClick,
  children,
}: {
  link: LinkInterface;
  onClick: () => void;
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const currentPage =
    link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
  return (
    <Link
      onClick={onClick}
      key={link.path}
      href={link.path}
      className={`${currentPage && "bg-main"} navLink w-full rounded-none h-12`}
    >
      {children ? children : link.title}
    </Link>
  );
}
