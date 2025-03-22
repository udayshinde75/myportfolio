"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Info, Briefcase, Mail } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Navbar (Desktop & Mobile) */}
      <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[90%] shadow-xl border border-gray-500 rounded-3xl flex justify-between px-6 backdrop-blur-xl bg-opacity-80 z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            MyApp
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink href="/" label="Home"/>
            <NavLink href="/about" label="About" />
            <NavLink href="/services" label="Services" />
            <NavLink href="/contact" label="Contact" />
          </div>
        </div>
      </nav>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] border border-gray-500 shadow-lg rounded-3xl flex justify-around p-3 md:hidden backdrop-blur-xl bg-opacity-80 z-50">
        <NavItem href="/" icon={<Home size={26} />} label="Home" />
        <NavItem href="/about" icon={<Info size={26} />} label="About" />
        <NavItem href="/services" icon={<Briefcase size={26} />} label="Services" />
        <NavItem href="/contact" icon={<Mail size={26} />} label="Contact" />
      </div>
    </>
  );
}

// Reusable NavLink Component
const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => (
  <Link href={href} onClick={onClick} className="text-lg font-medium hover:text-blue-600 transition">
    {label}
  </Link>
);

// Reusable Floating Navbar Item
const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link href={href} className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition">
    {icon}
    <span className="text-xs">{label}</span>
  </Link>
);
