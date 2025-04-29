import { useTranslations } from "next-intl";
import NavLink from "./NavLink/NavLink";
import Signin from "./Signin/Signin";
import ProfileLink from "./ProfileLink/ProfileLink";

export interface LinkInterface {
  title: string;
  path: string;
}

export default function Navbar() {
  const t = useTranslations("NavBarLinks");

  const LINKS: LinkInterface[] = [
    { title: t("Home"), path: "/" },
    { title: t("Services"), path: "/services" },
    { title: t("Application"), path: "/application" },
    { title: t("Contacts"), path: "/contacts" },
  ];
  return (
    <div className="flex items-center gap-2 h-full">
      {LINKS.map((link) => (
        <NavLink key={link.path} link={link} />
      ))}
      <Signin />
      <ProfileLink />
    </div>
  );
}
