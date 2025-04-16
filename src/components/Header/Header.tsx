import Logo from "./Logo/Logo";
import Navbar from "./Navbar/Navbar";

export default function Header() {
  return (
    <div className="header resPadding bg-headfoot flex justify-between">
      <Logo />
      <Navbar />
    </div>
  );
}
