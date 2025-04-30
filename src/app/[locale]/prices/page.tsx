import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function PricesPage() {
  const t = useTranslations("PricesPage");
  const services = [
    t("1stRow"),
    t("2ndRow"),
    t("3rdRow"),
    t("4thRow"),
    t("5thRow"),
    t("6thRow"),
  ];

  return (
    <main>
      <section>
        <div className="mainHeading">
          <h1 className="pageTitle">
            {useTranslations("NavBarLinks")("Prices")}
          </h1>
          <p className="text-sm text-center">
            <i>
              <span style={{ color: "red" }}>*</span>
              {t("clarify")}{" "}
              <Link href="/contacts" className="underline">
                {t("contactUs")}
              </Link>{" "}
              {t("or")}{" "}
              <Link href="/application" className="underline">
                {t("leaveARequest")}
              </Link>
            </i>
          </p>
        </div>
        <div className="heroDiv">
          {services.map((service) => (
            <div key={service}>{service}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
