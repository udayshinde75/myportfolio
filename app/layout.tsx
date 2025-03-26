"use client";
import "@/styles/globals.css";

import { ReactNode, useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setCursorPos({ x, y });
  };

  // const [theme, setTheme] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     return localStorage.getItem("theme") || "light";
  //   }
  //   return "light";
  // });

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  

  return (
    <html lang="en">
      <body>
        
        <div
          onMouseMove={handleMouseMove}
          className="transition-colors duration-1000 flex h-full items-center justify-center flex-col relative overflow-hidden bg-gradient-to-br from-gray-200 dark:from-gray-700 via-gray-200 dark:via-gray-500 to-gray-200 dark:to-gray-600 py-12 pb-32"
        >
          {/* Cursor glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-100"
            style={{
              background: `radial-gradient(circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(255, 255, 255, 0.7) 0%, transparent 30%)`,
              mixBlendMode: "soft-light",
            }}
          ></div>

          {children}
        </div>
      </body>
    </html>
  );
}