import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/qafyLogo.png" width={120} height={120} alt="" />
    </Link>
  );
}
