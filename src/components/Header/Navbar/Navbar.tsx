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
    { title: t("WhyUs"), path: "/whyus" },
    { title: t("Services"), path: "/services" },
    { title: t("Application"), path: "/application" },
  ];
  return (
    <div className="hidden sm:flex items-center gap-2 h-full">
      {LINKS.map((link) => (
        <NavLink key={link.path} link={link} />
      ))}
      <Signin />
    </div>
  );
}
