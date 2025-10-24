"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Wait for component to mount before rendering icons
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add smooth transition when theme changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.style.transition = "background-color 0.3s ease-in-out, color 0.3s ease-in-out";
      return () => {
        document.documentElement.style.transition = "";
      };
    }
  }, [mounted]);

  const toggleTheme = () => {
    setIsChanging(true);
    setTheme(theme === "light" ? "dark" : "light");
    // Reset changing state after transition
    setTimeout(() => setIsChanging(false), 300);
  };

  // Prevent rendering on server to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ rotate: 180 }}
      transition={{ duration: 0.3 }}
      className={`px-2 rounded-full transition-all duration-300 flex items-center justify-center ${
        isChanging ? 'opacity-50' : 'opacity-100'
      }`}
      aria-label="Toggle theme"
      disabled={isChanging}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </motion.div>
    </motion.button>
  );
}
