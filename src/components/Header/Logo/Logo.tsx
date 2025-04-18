import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-center h-full w-1/2">
      <Image src="/qafyLogo.png" width={50} height={50} alt=""/>
    </div>
  );
}
