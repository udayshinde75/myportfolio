"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return typeof window !== "undefined" &&
      localStorage.getItem("theme") === "dark"
      ? "dark"
      : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1.1 }}
      whileTap={{ scale: 0.5 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="p-2 bg-none dark:text-gray-200 text-gray-900 transition"
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="Moon"
            initial={{ rotate: 90, opacity: 0, color: "#ffffff" }} // Dark Blue
            animate={{ rotate: 0, opacity: 1, color: "#ffffff" }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Moon size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, color: "#000000" }} // Yellow
            animate={{ rotate: 0, opacity: 1, color: "#000000" }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sun size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
