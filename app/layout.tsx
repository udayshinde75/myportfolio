"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/custom/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ReactNode, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setCursorPos({ x, y });
  };
  return (
    <html lang="en">
      <body>
      <Navbar />
        <div
          onMouseMove={handleMouseMove}
          className="flex h-screen items-center justify-center flex-col relative overflow-hidden bg-gradient-to-br from-gray-700 via-gray-400 to-gray-600 pt-16"
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
