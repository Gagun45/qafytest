import { Link } from "@/i18n/navigation";
import { faArrowDownLong, faCircle } from "@fortawesome/free-solid-svg-icons";
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
    <main className="flex justify-center">
      <div className="w-full max-w-[750px] flex flex-col items-center gap-[30px]">
        <h1 className="text-center text-4xl md:text-6xl">🧾 Як це працює?</h1>
        <div className="flex md:text-lg w-full max-w-[320px] flex-col gap-6 md:gap-4">
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
                <FontAwesomeIcon icon={faArrowDownLong} />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
