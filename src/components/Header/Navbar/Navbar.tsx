import Theme from "../Theme/Theme";
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
    <div className="hidden sm:flex items-center gap-2 justify-center h-full w-1/2">
      <Theme />
      {LINKS.map((link) => (
        <NavLink key={link.path} link={link} />
      ))}
      <Signin />
    </div>
  );
}
