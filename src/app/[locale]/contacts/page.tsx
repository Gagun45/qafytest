import { Link } from "@/i18n/navigation";
import styles from "./ContactsPage.module.css";
import {
  FaInstagram,
  FaSearchLocation,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useTranslations } from "next-intl";

export default function ContactsPage() {
  const t = useTranslations('ContactsPage')
  return (
    <main className={styles.main}>
      <section>
        <div className="mainHeading gap-1 text-center">
          <h1 className="pageTitle">{t('title')}</h1>
          <p>
            {t('subtitle')}
          </p>
          <p className="font-semibold italic">{t('subtitle2')}</p>
        </div>
        <div className="heroDiv">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <a
                href="https://maps.app.goo.gl/oPaqjkQNkuh8KHMo8?g_st=atm"
                target="_blank"
              >
                <FaSearchLocation />
              </a>
              <h3>Waldstraße 37, 93161 Sinzing, Deutschland</h3>
            </div>
            <a href="https://maps.app.goo.gl/oPaqjkQNkuh8KHMo8?g_st=atm" target="_blank">
              <i className="text-sm">{t('googleMaps')}</i>
            </a>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center">
              <a href="tg://resolve?domain=Qafy_mobile" target="_blank">
                <FaTelegram />
              </a>
              Telegram:
            </div>
            <a href="tg://resolve?domain=Qafy_mobile" target="_blank">
              Qafy_mobile
            </a>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center">
              <a href="https://wa.me/+4915140164020" target="_blank">
                <FaWhatsapp />
              </a>
              WhatsApp:
            </div>
            <a href="https://wa.me/+4915140164020" target="_blank">
              +49 1514 0164020
            </a>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center">
              <a href="https://www.instagram.com/qafy.mobile" target="_blank">
                <FaInstagram />
              </a>
              Instargram:
            </div>
            <a href="https://www.instagram.com/qafy.mobile" target="_blank">
              qafy.mobile
            </a>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Link href="/application">
                <MdEmail />
              </Link>
              Email:
            </div>
            <Link href="/application">qafy42@gmail.com</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
