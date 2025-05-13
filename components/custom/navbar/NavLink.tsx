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
