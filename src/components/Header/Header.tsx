import Logo from "./Logo/Logo";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import Navbar from "./Navbar/Navbar";
import Theme from "./Theme/Theme";

export default function Header() {
  return (
    <header className="resPadding relative flex items-center justify-between">
      <div className="flex w-1/3 sm:hidden  h-full items-center justify-start">
        <Theme />
      </div>
      <div className="flex gap-4 w-1/3 sm:w-1/2 sm:justify-start justify-center items-center h-full">
        <Logo />
        <div className="hidden sm:flex h-full w-1/2 items-center justify-center">
          <Theme />
        </div>
      </div>
      <div className="flex w-1/3 sm:w-1/2  h-full items-center">
        <Navbar />
        <MobileNavbar />
      </div>
    </header>
  );
}
