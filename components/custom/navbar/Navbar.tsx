/**
 * Navbar Component
 * 
 * A responsive navigation component that provides both desktop and mobile navigation
 * Features:
 * - Responsive design with mobile-first approach
 * - Theme switching with persistence
 * - Animated entrance using Framer Motion
 * - Cross-tab theme synchronization
 * - Backdrop blur effect
 * - Separate mobile and desktop layouts
 * 
 * @returns {JSX.Element} The navigation layout
 */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import NavLink from "@/components/custom/navbar/NavLink"
import NavItem from "./NavItem";
import {Home, Info, Briefcase, Mail, FolderOpen, User } from "lucide-react";
import ThemeToggle from "@/components/custom/navbar/ThemeToggle";
import { motion } from "framer-motion";
import { Metadata } from "next";

// SEO metadata for the navigation
export const metadata: Metadata = {
    title: "Navigation - Uday Shinde Portfolio",
    description: "Main navigation for Uday Shinde's portfolio website, providing access to Home, About, Services, Projects, and Contact sections.",
    keywords: ["navigation", "portfolio", "menu", "responsive", "theme"],
    openGraph: {
        title: "Navigation - Uday Shinde Portfolio",
        description: "Main navigation for Uday Shinde's portfolio website",
        type: "website"
    }
};

// Main navigation component with responsive design and theme support
export default function Navbar() {
    // Theme persistence and synchronization across tabs
    useEffect(() => {
        // Listen for theme changes across browser tabs
        const handleStorageChange = () => {
            const currentTheme = localStorage.getItem("theme") || "light";
            document.documentElement.classList.toggle("dark", currentTheme === "dark");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <>
            {/* Top Navigation Bar - Visible on all devices */}
            <motion.nav
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="fixed top-2 transform -translate-x-1/2 w-[90%] md:w-[80%] shadow-xl border border-gray-500 rounded-3xl px-3 flex justify-between backdrop-blur-xl bg-opacity-80 z-50"
            >
                <div className="container mx-auto flex items-center justify-between w-full p-4 gap-x-6">
                    {/* Logo/Brand */}
                    <Link href={`/`} className="text-lg font-bold text-gray-900 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-300 transition-colors duration-1000">
                        I'm Dev
                    </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center justify-between space-x-4">
            <NavLink href={`/`} label="Home"/>
            <NavLink href={`/about`} label="About" />
            <NavLink href={`/services`} label="Services" />
            <NavLink href={`/projects`} label="Projects" />
            <NavLink href={`/contact`} label="Contact" />
            <NavItem href={`/auth/signin`} icon={<User />} />
            {/*<NavItem href="/auth/generate-passkey" icon={<Key />} />*/}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Icons (Top Bar) */}
          <div className="space-x-6 md:hidden flex items-center justify-between">
            <NavItem href="/auth/signin" icon={<User />} />
            {/*<NavItem href="/auth/generate-passkey" icon={<Key />} />*/}
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

            {/* Bottom Navigation Bar - Mobile Only */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] border border-gray-500 shadow-lg rounded-3xl flex justify-around p-3 md:hidden backdrop-blur-xl bg-opacity-80 z-50">
                <NavItem href="/services" icon={<Briefcase />} label="Services"/>
                <NavItem href="/about" icon={<Info />} label="About"/>
                <NavItem href="/" icon={<Home />} label="Home" />
                <NavItem href="/contact" icon={<Mail />} label="Contact" />
                <NavItem href="/projects" icon={<FolderOpen />} label="Projects" />
            </div>
        </>
    );
}



