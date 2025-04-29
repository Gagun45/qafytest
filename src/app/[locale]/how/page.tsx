import { Link } from "@/i18n/navigation";
import {
  faArrowDown,
  faArrowDownLong,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HowPage() {
  const ROWS = [
    "Ми зв’язуємось для уточнення деталей",
    "Надсилаєте пристрій або приходите особисто",
    "Проводимо діагностику та повідомляємо вартість",
    "Після згоди – виконуємо ремонт",
    "Отримуєте готовий пристрій та гарантію",
  ];

  return (
    <main>
      <section>
        <div className="mainHeading">
          <h1 className="pageTitle">🧾 Як це працює?</h1>
        </div>

        <div className="heroDiv">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon icon={faCircle} />
              <Link href="/application" className="underline">
                Залишаєте заявку на сайті
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
