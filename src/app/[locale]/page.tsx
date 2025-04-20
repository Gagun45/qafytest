import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col lg:items-center lg:flex-row gap-8 justify-between">
      <section className="flex flex-col lg:w-1/2 gap-8 text-center">
        <h2 className="text-5xl">QAFY-MOBILE - майстерня сучасного сервісу</h2>
        <p className="text-lg">
          Qafy-mobile — це сервіс нового покоління для тих, хто цінує якість,
          швидкість і чесний підхід. Ми не просто ремонтуємо техніку — ми
          повертаємо комфорт у твій щоденний ритм.
        </p>
        <div className="flex justify-center gap-8">
          <Link
            href={"/"}
            className="bg-headfoot w-32 h-12 flex items-center justify-center rounded-full"
          >
            Contact
          </Link>
          <Link
            href={"/"}
            className="bg-headfoot dark:hover:bg-white hover:text-main w-32 h-12 flex items-center justify-center rounded-full"
          >
            Contact
          </Link>
        </div>
      </section>

      <section className="h-64 sm:h-84 lg:h-[440px] xl:h-[556px] 2xl:h-[640px] flex w-full justify-center lg:w-1/2">
        <div className="h-full w-[384px] sm:w-[460px] md:w-[620px] lg:w-full max-w-[816px] flex relative">
          <Image src={"/home.jpg"} alt="home" fill />
        </div>
      </section>
    </main>
  );
}
