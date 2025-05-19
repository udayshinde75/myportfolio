/**
 * Login Button Component
 * 
 * A reusable button component for login functionality
 * Features:
 * - Client-side navigation using Next.js Router
 * - Support for modal and redirect modes
 * - Customizable child content
 * - Cursor pointer styling
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display in the button
 * @param {"modal" | "redirect"} [props.mode="redirect"] - Button behavior mode
 * @param {boolean} [props.asChild] - Whether to render as a child component
 * @returns {JSX.Element} The login button layout
 */
"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    asChild?: boolean;
}

export const LoginButton = ({
    children, 
}: LoginButtonProps) => {
    const router = useRouter();

    /**
     * Handles button click event
     * Navigates to the login page
     */
    const onClick = () => {
        //console.log("Login button clicked");
        router.push("/auth/login")
    }
    // Render redirect button with click handler
    return (
        <span className="cursor-pointer" onClick={onClick}>
            {children}
        </span>
    )
}