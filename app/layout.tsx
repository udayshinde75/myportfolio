import Navbar from "@/components/custom/navbar/Navbar";
import "@/styles/globals.css";
import { Toaster } from 'sonner';

import { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
        <body
          className="transition-colors duration-1000 flex h-full items-center justify-center flex-col relative bg-gradient-to-br from-gray-300 dark:from-gray-900 via-gray-300 dark:via-gray-900 to-gray-300 dark:to-gray-900 py-12 pb-32"
        >
          <Navbar/>
          {children}
          <Toaster position="top-center" richColors />
        </body>
    </html>
  );
}