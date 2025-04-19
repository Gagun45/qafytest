import { useTranslations } from "next-intl";
import NavLink from "./NavLink/NavLink";
import Signin from "./Signin/Signin";

export interface LinkInterface {
  title: string;
  path: string;
}

export default function Navbar() {
  const t = useTranslations("NavBarLinks");
  const LINKS: LinkInterface[] = [
    { title: t("Home"), path: "/" },
    { title: t("About"), path: "/about" },
    { title: t("Contact"), path: "/contact" },
  ];
  return (
    <div className="hidden sm:flex items-center gap-2 justify-end h-full w-full ">
      {LINKS.map((link) => (
        <NavLink key={link.path} link={link} />
      ))}
      <Signin />
    </div>
  );
}
