import Logo from "./Logo/Logo";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import Navbar from "./Navbar/Navbar";

export default function Header() {
  return (
    <header className="resPadding relative flex justify-between">
      <Logo />
      <Navbar />
      <MobileNavbar />
    </header>
  );
}
