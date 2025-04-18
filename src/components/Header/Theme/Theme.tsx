"use client";

import { useTheme } from "@/app/ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Theme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="h-full flex items-center justify-center">
      <div
        onClick={toggleTheme}
        className="h-6 w-12 bg-white border-1 rounded-full flex items-center"
      >
        <div
          className={`h-5 w-5 rounded-full bg-black flex justify-center items-center ${
            theme === "light" ? "ml-0.5" : "ml-6"
          } transition-all duration-500`}
        >
          <FontAwesomeIcon
            icon={theme === "light" ? faMoon : faSun}
            className="text-white"
          />
        </div>
      </div>
    </div>
  );
}
