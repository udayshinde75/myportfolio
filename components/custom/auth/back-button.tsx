/**
 * Back Button Component
 * 
 * A reusable navigation button component for authentication forms
 * Features:
 * - Client-side navigation using Next.js Link
 * - Customizable icon and destination
 * - Link variant styling
 * - Responsive layout
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - Icon element to display
 * @param {string} props.href - Destination URL for navigation
 * @returns {JSX.Element} The back button layout
 */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
    icon: React.ReactNode;
    href: string;
}   

export const BackButton = ({
    icon,
    href
} : BackButtonProps) => {
    return (
        <Button
            variant={"link"}
            className="font-normal w-full"
            size={"sm"}
        >
            <Link href={href}>
                {icon}
            </Link>
        </Button>
    )
}