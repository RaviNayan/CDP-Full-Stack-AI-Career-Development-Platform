"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-20 right-5 z-[9999] flex h-12 w-12 items-center justify-center rounded-full border bg-background text-foreground shadow-xl hover:scale-110 transition"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}