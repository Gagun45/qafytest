import Logo from "./Logo/Logo";
import Navbar from "./Navbar/Navbar";

export default function Header() {
  return (
    <header className="resPadding flex justify-between">
      <Logo />
      <Navbar />
    </header>
  );
}
