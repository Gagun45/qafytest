"use client";

import { useTheme } from "@/app/[locale]/ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Theme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      onClick={toggleTheme}
      className="h-6 w-12 bg-white rounded-full flex items-center cursor-pointer"
    >
      <div
        className={`h-5 w-5 rounded-full bg-black flex justify-center items-center ${
          theme === "light" ? "ml-1" : "ml-6"
        } transition-all duration-500`}
      >
        <FontAwesomeIcon
          icon={theme === "light" ? faMoon : faSun}
          className="text-white w-3 h-3"
        />
      </div>
    </div>
  );
}
