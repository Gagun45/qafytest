import { SessionProvider } from "next-auth/react";
import NavLink from "./NavLink/NavLink";
import Signin from "./Signin/Signin";

export interface LinkInterface {
  title: string;
  path: string;
}

const LINKS: LinkInterface[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export default function Navbar() {
  return (
    <div className="flex items-center gap-2 justify-center h-full">
      {LINKS.map((link) => (
        <NavLink key={link.path} link={link} />
      ))}
      <SessionProvider>
        <Signin />
      </SessionProvider>
    </div>
  );
}
