import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex gap-8 h-[var(--mainH)]">
      <section className="w-full xl:w-1/2 h-full flex flex-col gap-8 text-justify xs:gap-10 sm:gap-14 md:gap-10 text-2xl">
        <h2 className="text-5xl text-center">
          <span style={{ color: "blue" }}>QAFY</span>{" "}
          <span className="text-yellow-400">MOBILE</span>
        </h2>
        <p>Ваш надійний сервіс з ремонту електроніки у Німеччині</p>
        <p>
          Ми — український сервісний центр, що працює на території Німеччини та
          спеціалізується на ремонті смартфонів, ноутбуків, планшетів, ПК,
          консолей та іншої електроніки.
        </p>
        <p>
          Професійне обладнання, багаторічний досвід та індивідуальний підхід —
          гарантія якісного ремонту за розумну ціну.
        </p>
        <p>Працюємо швидко та з турботою про клієнта.</p>
        <div className="flex justify-center md:justify-start mt-auto gap-8 py-0 sm:py-2 md:py-0">
          <Link
            href={"/"}
            className="bg-headfoot hover:bg-text dark:hover:bg-white hover:text-main w-32 h-12 flex items-center justify-center rounded-sm"
          >
            Послуги
          </Link>
          <Link
            href={"/"}
            className="bg-headfoot hover:bg-text dark:hover:bg-white hover:text-main w-32 h-12 flex items-center justify-center rounded-sm"
          >
            Контакти
          </Link>
        </div>
      </section>

      <section className="hidden xl:flex w-1/2 h-full">
        <div className="flex h-full w-full relative">
          <Image src={"/qafy-mobile.png"} alt="home" fill className="object-contain" />
        </div>
      </section>
    </main>
  );
}
