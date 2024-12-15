"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored theme or default to system preference
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      setTheme(systemPrefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md dark:bg-stone-900 bg-stone-100 hover:opacity-80 transition-all "
    >
      {theme === "light" ? (
        <FaMoon className="text-xl text-gray-800 " />
      ) : (
        <LuSun className="text-xl text-yellow-300" />
      )}
    </button>
  );
}
