"use client";

import { usePathname } from "@/i18n/navigation";
import type { LinkInterface } from "../Navbar/Navbar";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function MobileLink({
  link,
  onClick,
}: {
  link: LinkInterface;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const currentPage =
    link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
  return (
    <Link
      locale={locale}
      onClick={onClick}
      key={link.path}
      href={link.path}
      className={`${currentPage && "bg-main"} navLink`}
    >
      {link.title}
    </Link>
  );
}
