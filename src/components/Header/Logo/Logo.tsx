import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/qafyLogo.png" width={120} height={120} alt="" />
    </Link>
  );
}
