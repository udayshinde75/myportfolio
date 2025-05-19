/**
 * NavItem Component
 * 
 * A reusable navigation item component that displays an icon and optional label
 * Features:
 * - Animated icon using Framer Motion
 * - Responsive hover effects
 * - Dark mode support
 * - Optional label display
 * - Smooth transitions
 * 
 * @param {Object} props - Component props
 * @param {string} props.href - The URL to navigate to
 * @param {React.ReactNode} props.icon - The icon component to display
 * @param {string} [props.label] - Optional label text to display below the icon
 * @returns {JSX.Element} The navigation item layout
 */
import { motion } from "framer-motion";
import Link from "next/link";

// Reusable Floating Navbar Item
export default function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label?: string; }) {
    return (
      <Link href={href} className="flex flex-col items-center transition">
        {/* Animated icon container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex transition-colors duration-1000 flex-col items-center text-gray-900 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-300"
        >
          {icon}
        </motion.div>
        {/* Optional label with hover effects */}
        {label && (
          <span className="text-xs transition-colors duration-1000 text-gray-900 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-300">
            {label}
          </span>
        )}
      </Link>
    );
  };