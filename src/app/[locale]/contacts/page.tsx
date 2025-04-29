import { Link } from "@/i18n/navigation";
import styles from "./ContactsPage.module.css";

export default function ContactsPage() {
  return (
    <main className={styles.main}>
      <section>
        <div className="mainHeading gap-1 text-center">
          <h1 className="pageTitle">Наші контакти</h1>
          <p>
            Зв’язатись зі мною можна тільки через переписку або особисту зустріч
          </p>
          <p className="font-semibold italic">На дзвінки не відповідаю</p>
        </div>
        <div className="heroDiv">
          <div className="flex">
            <span>📍</span>
            <div>
              <h3 className="flex gap-2">
                Waldstraße 37, 93161 Sinzing, Germany
              </h3>
              <a
                href="https://maps.app.goo.gl/QJ9aTANKbQAy4RjaA"
                target="_blank"
              >
                <i className="text-sm">View on Google Maps</i>
              </a>
            </div>
          </div>
          <div className="flex gap-2">
            💬Telegram:
            <a href="tg://resolve?domain=Qafy_mobile" target="_blank">
              Qafy_mobile
            </a>
          </div>
          <div className="flex gap-2">
            📱WhatsApp:
            <a href="https://wa.me/+4915140164020" target="_blank">
              +49 1514 0164020
            </a>
          </div>
          <div className="flex gap-2">
            📸Instargram:
            <a href="https://www.instagram.com/qafy.mobile" target="_blank">
              qafy.mobile
            </a>
          </div>
          <div className="flex gap-2">
            📧Email: <Link href="/application">qafy42@gmail.com</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
