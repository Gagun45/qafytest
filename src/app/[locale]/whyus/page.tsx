import {
  faCheckDouble,
  faContactBook,
  faDollar,
  faHandshake,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Image from "next/image";

const tClass = "text-4xl lg:text-6xl w-16 flex-shrink-0";

export default function WhyUsPage() {
  const t = useTranslations("WhyUsPage");
  const ROWS = [
    {
      text: t("1stP"),
      Component: <FontAwesomeIcon icon={faHandshake} className={tClass} />,
    },
    {
      text: t("2ndP"),
      Component: <FontAwesomeIcon icon={faCheckDouble} className={tClass} />,
    },
    {
      text: t("3rdP"),
      Component: <FontAwesomeIcon icon={faDollar} className={tClass} />,
    },
    {
      text: t("4thP"),
      Component: <FontAwesomeIcon icon={faLanguage} className={tClass} />,
    },
    {
      text: t("5thP"),
      Component: <FontAwesomeIcon icon={faContactBook} className={tClass} />,
    },
  ];
  return (
    <main className="flex">
      <section className="flex flex-col gap-6 sm:gap-12 lg:w-2/3">
        <h1 className="text-4xl text-center">{t("title")}</h1>
        <div className="flex flex-col gap-12">
          {ROWS.map(({ text, Component }) => (
            <div
              key={text}
              className="flex items-center gap-4 text-lg sm:text-2xl"
            >
              {Component}
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="hidden lg:flex items-center w-1/3">
        <div className="relative w-full max-w-[475px] aspect-square">
          <Image src={"/whyus.png"} alt="" fill />
        </div>
      </section>
    </main>
  );
}
