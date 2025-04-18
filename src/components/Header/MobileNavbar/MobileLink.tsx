"use client";

import { usePathname } from "next/navigation";
import type { LinkInterface } from "../Navbar/Navbar";
import Link from "next/link";

export default function MobileLink({
  link,
  onClick,
}: {
  link: LinkInterface;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const currentPage =
    link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
  return (
    <Link
      onClick={onClick}
      key={link.path}
      href={link.path}
      className={`${currentPage && "bg-main"} navLink`}
    >
      {link.title}
    </Link>
  );
}
