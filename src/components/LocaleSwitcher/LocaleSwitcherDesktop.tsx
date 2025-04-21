"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DE, GB, UA } from "country-flag-icons/react/3x2";
import { useLocale } from "next-intl";
import { useState, useTransition } from "react";

const locales = [
  { locale: "en", Component: GB },
  { locale: "ukr", Component: UA },
  { locale: "de", Component: DE },
];

export default function LocaleSwitcherDesktop() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = useLocale();

  const matchFlag = locales.find((item) => item.locale === currentLocale);

  const { Component: CurrentComponent } = matchFlag!;

  const [, startTransition] = useTransition();

  const handleLocaleChange = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    startTransition(() => {
      router.replace(pathname, { locale });
      window.location.reload();
    });
  };

  return (
    <div
      className={`flex items-center relative py-1 z-30 px-2 h-8 rounded-sm ${
        isOpen && "rounded-b-none"
      } outline-1 outline-white cursor-pointer`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center gap-2">
        <CurrentComponent className="w-5" />
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={`w-3 duration-300 ease-in-out ${isOpen && "-rotate-90"}`}
        />
      </div>
      {isOpen && (
        <div className="flex w-full left-0 absolute bg-headfoot flex-col top-8 outline-1 outline-white">
          {locales.map(({ locale, Component }) => (
            <div
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className="flex justify-between py-2 px-2 hover:bg-main cursor-pointer"
            >
              <Component className="w-5" />
              {currentLocale === locale && (
                <FontAwesomeIcon icon={faCheck} className="w-3" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
