/**
 * Header Component
 * 
 * A reusable header component for authentication pages
 * Features:
 * - Custom Poppins font styling
 * - Centered layout with customizable label
 * - Consistent typography across auth pages
 * - Responsive text sizing
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Text to display in the header
 * @returns {JSX.Element} The header layout
 */
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

// Initialize Poppins font with specific weight and subset
const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

interface HeaderProps {
    label: string;
}

export const Header = ({
    label
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            {/* Main heading with custom font */}
            <h1 className={cn("text-3xl font-semibold",
                font.className
            )}>
                
            </h1>
            {/* Label text with bold styling */}
            <p className="font-bold text-2xl">
                {label}
            </p>
        </div>
    )
}