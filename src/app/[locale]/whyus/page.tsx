import { Link } from "@/i18n/navigation";
import {
  faCheckDouble,
  faContactBook,
  faDollar,
  faHandshake,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

const tClass = "text-4xl lg:text-6xl w-16 shrink-0";

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
    <main>
      <section>
        <div className="mainHeading gap-0">
          <h1 className="pageTitle">{t("title")}</h1>
          <Link href={"/application"} className="underline">
            ({useTranslations()('leaveAnApplication')})
          </Link>
        </div>
        <div className="heroDiv">
          {ROWS.map(({ text, Component }) => (
            <div
              key={text}
              className="flex items-center gap-4"
            >
              {Component}
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
