import { motion } from "framer-motion";
import Link from "next/link";

// Reusable Floating Navbar Item
export default function NavItem({ href, icon, label, theme }: { href: string; icon: React.ReactNode; label?: string; theme: string }) {
    return (
      <Link href={href} className="flex flex-col items-center transition">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex transition-colors duration-1000 flex-col items-center text-gray-500 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-900"
        >
          {icon}
        </motion.div>
        <span className="text-xs transition-colors duration-1000 text-gray-500 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-900">{label}</span>
      </Link>
    );
  };