'use client';

import { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { LuSun } from 'react-icons/lu';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored theme or system preference
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    const currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(currentTheme);

    // Apply theme and color-scheme
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    document.documentElement.classList.toggle(
      'light',
      currentTheme === 'light',
    );
    document.documentElement.style.colorScheme = currentTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Apply theme and color-scheme
    document.documentElement.classList.toggle('light', newTheme === 'light');

    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.style.colorScheme = newTheme;

    // Store theme in localStorage
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="rounded-md bg-stone-100 p-2 transition-colors hover:opacity-80 dark:bg-stone-900"
    >
      {theme === 'light' ? (
        <FaMoon className="text-xl text-stone-900" />
      ) : (
        <LuSun className="text-xl text-yellow-300" />
      )}
    </button>
  );
}
