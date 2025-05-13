import { motion } from "framer-motion";
import Link from "next/link";

// Reusable Floating Navbar Item
export default function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label?: string; }) {
    return (
      <Link href={href} className="flex flex-col items-center transition">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex transition-colors duration-1000 flex-col items-center text-gray-900 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-300"
        >
          {icon}
        </motion.div>
        <span className="text-xs transition-colors duration-1000 text-gray-900 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-300">{label}</span>
      </Link>
    );
  };