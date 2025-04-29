import LocaleSwitcherDesktop from "../LocaleSwitcher/LocaleSwitcherDesktop";
import LocaleSwitcherPhone from "../LocaleSwitcher/LocaleSwitcherPhone";
import Logo from "./Logo/Logo";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import Navbar from "./Navbar/Navbar";
import Theme from "./Theme/Theme";

export default function Header() {
  return (
    <header className="resPadding relative flex items-center justify-between">
      {/*  DESKTOP */}
      <div className="hidden lg:flex w-full h-full justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <Navbar />
          <LocaleSwitcherDesktop />
          <Theme />
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex lg:hidden justify-between items-center w-full">
        <Logo />
        <div className="flex items-center gap-4">
          <Theme />
          <LocaleSwitcherPhone />
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}
