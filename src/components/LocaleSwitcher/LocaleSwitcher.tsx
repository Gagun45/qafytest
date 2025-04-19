"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { DE, GB, UA } from "country-flag-icons/react/3x2";
import { useTransition } from "react";

const locales = [
  { locale: "en", Component: GB },
  { locale: "ukr", Component: UA },
  { locale: "de", Component: DE },
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const [, startTransition] = useTransition();

  const handleLocaleChange = (locale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <div className="flex gap-2">
      {locales.map(({ locale, Component }) => (
        <Component
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className="w-4 h-4"
        />
      ))}
    </div>
  );
}
