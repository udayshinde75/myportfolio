/**
 * NavLink Component
 * 
 * A reusable navigation link component for desktop navigation
 * Features:
 * - Responsive text styling
 * - Dark mode support
 * - Smooth hover transitions
 * - Optional click handler
 * - Consistent typography
 * 
 * @param {Object} props - Component props
 * @param {string} props.href - The URL to navigate to
 * @param {string} props.label - The text to display for the link
 * @param {() => void} [props.onClick] - Optional click handler function
 * @returns {JSX.Element} The navigation link layout
 */
import Link from "next/link";

// Reusable NavLink Component
export default function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className="text-lg font-medium text-gray-900 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-300 transition-colors duration-1000"
    >
      {label}
    </Link>
  );
}
