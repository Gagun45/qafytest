import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ukr", "de"],
  defaultLocale: "de",
  localeDetection: true,
});
