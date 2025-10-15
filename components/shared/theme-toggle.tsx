//"use client";
//
//import * as React from "react";
//import { Moon, Sun } from "lucide-react";
//import { useTheme } from "next-themes";
//
//import { Button } from "@/components/ui/button";
//import {
//  DropdownMenu,
//  DropdownMenuContent,
//  DropdownMenuItem,
//  DropdownMenuTrigger,
//} from "@/components/ui/dropdown-menu";
//
//export function ModeToggle() {
//  const { setTheme, theme } = useTheme();
//
//
//  return (
//    <DropdownMenu>
//      <DropdownMenuTrigger asChild>
//        <Button variant="outline" size="icon">
//          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//          <span className="sr-only">Toggle theme</span>
//        </Button>
//      </DropdownMenuTrigger>
//      <DropdownMenuContent align="end">
//        <DropdownMenuItem onClick={() => setTheme("light")}>
//          Light
//        </DropdownMenuItem>
//        <DropdownMenuItem onClick={() => setTheme("dark")}>
//          Dark
//        </DropdownMenuItem>
//      </DropdownMenuContent>
//    </DropdownMenu>
//  );
//}
//"use client";
//
//import { useTheme } from "next-themes";
//import { Sun, Moon } from "lucide-react";
//import { motion } from "framer-motion";
//
//export default function ModeToggle() {
//  const { theme, setTheme } = useTheme();
//
//  const toggleTheme = () => {
//    setTheme(theme === "light" ? "dark" : "light");
//  };
//
//  return (
//    <button
//      onClick={toggleTheme}
//      className="p-2 rounded-full transition hover:bg-gray-200 dark:hover:bg-gray-700"
//      aria-label="Toggle theme"
//    >
//      <motion.button
//        onClick={toggleTheme}
//        whileTap={{ rotate: 180 }}
//        transition={{ duration: 0.3 }}
//        className="p-3 rounded-full transition hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
//        aria-label="Toggle theme"
//      >
//        {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
//      </motion.button>
//    </button>
//  );
//}
//"use client";
//
//import { useTheme } from "next-themes";
//import { Sun, Moon } from "lucide-react";
//import { motion } from "framer-motion";
//
//export default function ModeToggle() {
//  const { theme, setTheme } = useTheme();
//
//  const toggleTheme = () => {
//    setTheme(theme === "light" ? "dark" : "light");
//  };
//
//  return (
//    <motion.button
//      onClick={toggleTheme}
//      whileTap={{ rotate: 180 }}
//      transition={{ duration: 0.3 }}
//      className="p-3 rounded-full transition hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
//      aria-label="Toggle theme"
//    >
//      {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
//    </motion.button>
//  );
//}
//
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount before rendering icons
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Prevent rendering on server to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ rotate: 180 }}
      transition={{ duration: 0.3 }}
      className="p-3 rounded-full transition hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
    </motion.button>
  );
}
