import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");
  const SERVICES = [
    t("1st"),
    t("2nd"),
    t("3rd"),
    t("4th"),
    t("5th"),
    t("6th"),
    t("7th"),
    t("8th"),
  ];
  return (
    <main className="flex">
      <section className="flex flex-col w-full gap-6 sm:gap-12 xl:gap-9 2xl:gap-12 lg:w-2/3">
        <h1 className="text-center text-4xl md:text-6xl">{t("title")}</h1>
        <div className="flex flex-col gap-4">
          {SERVICES.map((service) => (
            <div key={service} className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="shrink-0 text-xs"
              />
              <p className="text-xl sm:text-2xl md:text-3xl">{service}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="hidden lg:flex items-center w-1/3">
        <div className="relative w-full max-w-[475px] aspect-square">
          <Image src={"/services.png"} alt="" fill />
        </div>
      </section>
    </main>
  );
}
