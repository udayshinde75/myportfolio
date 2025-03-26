"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavLink from "@/components/custom/navbar/NavLink"
import NavItem from "./NavItem";
import {Home, Info, Briefcase, Mail, FolderOpen, User, Key } from "lucide-react";
import ThemeToggle from "@/components/custom/navbar/ThemeToggle";
import { motion } from "framer-motion";

interface ProfileProps {
  Name: string;
  id: string;
}

export default function Navbar({
  Name,
  id,
}: ProfileProps) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");

    // Listen for theme changes
    const handleStorageChange = () => setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <>
      {/* Top Navbar (Desktop & Mobile) */}
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
       className="fixed top-2 transform -translate-x-1/2 w-[90%] md:w-[90%] shadow-xl border border-gray-500 rounded-3xl px-3 flex justify-between  backdrop-blur-xl bg-opacity-80 z-50">
        <div className="container mx-auto flex items-center justify-between w-full p-4">
          {/* Logo */}
          <Link href={`/${id}`} className="text-lg font-bold text-gray-500 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-900 transition-colors duration-1000">
            {Name}
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-between space-x-4">
            <NavLink href={`/${id}`} label="Home"/>
            <NavLink href={`/about/${id}`} label="About" />
            <NavLink href={`/services/${id}`} label="Services" />
            <NavLink href={`/projects/${id}`} label="My Projects" />
            <NavLink href={`/contact/${id}`} label="Contact" />
            <NavItem href={`/auth/signup/${id}`} icon={<User />}  theme={theme} />
            <NavItem href="/auth/generate-passkey" icon={<Key />}  theme={theme} />
            <ThemeToggle />
          </div>
          <div className="space-x-6 md:hidden flex items-center justify-between">
            <NavItem href="/auth/signup" icon={<User />}  theme={theme} />
            <NavItem href="/auth/generate-passkey" icon={<Key />}  theme={theme} />
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] border border-gray-500 shadow-lg rounded-3xl flex justify-around p-3 md:hidden backdrop-blur-xl bg-opacity-80 z-50">
        <NavItem href="/services" icon={<Briefcase />} label="Services" theme={theme} />
        <NavItem href="/about" icon={<Info />} label="About" theme={theme} />
        <NavItem href="/" icon={<Home />} label="Home" theme={theme} />
        <NavItem href="/contact" icon={<Mail />} label="Contact" theme={theme} />
        <NavItem href="/projects" icon={<FolderOpen />} label="Projects" theme={theme} />
        
      </div>
    </>
  );
}



