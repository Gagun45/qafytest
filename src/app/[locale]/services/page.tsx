import { Link } from "@/i18n/navigation";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

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
    <main>
      <section>
        <div className="mainHeading">
          <h1 className="pageTitle">{t("title")}</h1>
          <Link href={"/application"} className="underline">
            ({useTranslations()("leaveAnApplication")})
          </Link>
        </div>
        <div className="heroDiv">
          {SERVICES.map((service) => (
            <div key={service} className="flex items-center gap-4">
              <FontAwesomeIcon icon={faArrowRight} className="shrink-0" />
              <p>{service}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
