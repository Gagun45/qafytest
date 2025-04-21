import {
  faCheckDouble,
  faContactBook,
  faDollar,
  faHandshake,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const tClass = "text-4xl w-14";

const ROWS = [
  {
    text: "Гарантія на всі роботи — ми впевнені в якості",
    Component: <FontAwesomeIcon icon={faHandshake} className={tClass} />,
  },
  {
    text: "Тільки перевірені запчастини — ніяких підробок",
    Component: <FontAwesomeIcon icon={faCheckDouble} className={tClass} />,
  },
  {
    text: 'Прозорі ціни — без "сюрпризів" після ремонту',
    Component: <FontAwesomeIcon icon={faDollar} className={tClass} />,
  },
  {
    text: "Підтримка українською, німецькою та англійською",
    Component: <FontAwesomeIcon icon={faLanguage} className={tClass} />,
  },
  {
    text: "Можливість онлайн-заявки та відстеження статусу ремонту",
    Component: <FontAwesomeIcon icon={faContactBook} className={tClass} />,
  },
];

export default function WhyUsPage() {
  return (
    <main className="flex">
      <section className="flex flex-col gap-6 sm:gap-12 lg:gap-24 lg:w-2/3">
        <h1 className="text-4xl text-center">Чому обирають нас?</h1>
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
