"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/custom/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ReactNode, useEffect, useState } from "react";

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ userID?: string }>;
}) {
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setUserID(resolvedParams?.userID || "");
    }
    fetchParams();
  }, [params]);

  const [user, setUser] = useState({
    name: "",
    email:"",
    id:"",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) return;
      const res = await fetch(`/api/auth/getUserByID?userID=${userID}`);
      const data = await res.json();
      setUser(data);
    };

    fetchData();
  }, [userID]);

  useEffect(() => {
    const fetchData = async () => {
        const res = await fetch(`/api/auth/getUserByID?userID=${userID}`);
        console.log("res:"+res)
        const data = await res.json();
        console.log("data:"+data)
        setUser(data);
    };

    fetchData();
  }, [userID]);
  

  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setCursorPos({ x, y });
  };

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <html lang="en">
      <body>
        <Navbar Name={user.name} id={user.id}/>
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