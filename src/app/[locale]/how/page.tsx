import { Link } from "@/i18n/navigation";
import {
  faArrowDown,
  faArrowDownLong,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

export default function HowPage() {
  const t = useTranslations("HowItWorksPage");
  const ROWS = [
    t('1stRow'),
    t('2ndRow'),
    t('3rdRow'),
    t('4thRow'),
    t('5thRow'),
  ];

  return (
    <main>
      <section>
        <div className="mainHeading">
          <h1 className="pageTitle">{t("title")}</h1>
        </div>

        <div className="heroDiv">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon icon={faCircle} />
              <Link href="/application" className="underline">
                {t("headingRow")}
              </Link>
            </div>
            <FontAwesomeIcon icon={faArrowDownLong} />
          </div>

          {ROWS.map((row, index) => (
            <div key={row} className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon icon={faCircle} />
                <span>{row}</span>
              </div>
              {index !== ROWS.length - 1 && (
                <FontAwesomeIcon icon={faArrowDown} />
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
