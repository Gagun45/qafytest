import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main className="flex gap-8">
      <section className="w-full xl:w-1/2 h-full flex flex-col gap-4 text-justify xs:gap-10 sm:gap-12 md:gap-10 text-lg sm:text-2xl">
        <h1 className="pageTitle">
          <span style={{ color: "blue" }}>QAFY</span>{" "}
          <span className="text-yellow-400">MOBILE</span>
        </h1>
        <p className="text-2xl font-semibold">{t("1stP")}</p>
        <p>{t("2ndP")}</p>
        <p>{t("3rdP")}</p>
        <p>{t("4thP")}</p>
        <div className="flex justify-center md:justify-start mt-auto gap-8 py-0 sm:py-2 md:py-0">
          <Link
            href={"/whyus"}
            className="bg-headfoot hover:bg-text dark:hover:bg-white hover:text-main sm:text-xl w-40 h-12 flex items-center justify-center rounded-sm"
          >
            {useTranslations('NavBarLinks')('WhyUs')}
          </Link>
          <Link
            href={"/services"}
            className="bg-headfoot hover:bg-text dark:hover:bg-white hover:text-main sm:text-xl w-40 h-12 flex items-center justify-center rounded-sm"
          >
            {useTranslations('NavBarLinks')('Services')}
          </Link>
        </div>
      </section>

      <section className="hidden xl:flex w-1/2 h-full">
        <div className="flex md:h-[540px] 2xl:h-[620px] w-full relative">
          <Image
            src={"/qafy-mobile.png"}
            alt="home"
            fill
            className="object-contain"
          />
        </div>
      </section>
    </main>
  );
}
