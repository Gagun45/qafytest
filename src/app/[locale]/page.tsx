import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main>
      <section>
        <div className="mainHeading">
          <h1 className="pageTitle">
            <span style={{ color: "blue" }}>QAFY</span>{" "}
            <span className="text-yellow-400">MOBILE</span>
          </h1>
          <p className="text-2xl lg:text-4xl font-semibold text-center">
            {t("1stP")}
          </p>
        </div>
        <div className="heroDiv">
          <p>{t("2ndP")}</p>
          <p>{t("3rdP")}</p>
          <p>{t("4thP")}</p>
          <div className="flex justify-center md:justify-start gap-8">
            <Link
              href={"/whyus"}
              className="bg-headfoot hover:bg-text dark:hover:bg-white hover:text-main sm:text-xl w-40 h-12 flex items-center justify-center rounded-sm"
            >
              {useTranslations("NavBarLinks")("WhyUs")}
            </Link>
            <Link
              href={"/services"}
              className="bg-headfoot hover:bg-text dark:hover:bg-white hover:text-main sm:text-xl w-40 h-12 flex items-center justify-center rounded-sm"
            >
              {useTranslations("NavBarLinks")("Services")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
