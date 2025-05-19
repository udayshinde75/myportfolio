/**
 * CardWrapper Component
 * 
 * A reusable card component that provides a consistent layout for authentication forms
 * Features:
 * - Responsive card layout with shadow and border
 * - Backdrop blur effect for modern UI
 * - Header with customizable label
 * - Footer with back button
 * - Flexible content area for child components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in the card content
 * @param {string} props.headerLabel - Text to display in the card header
 * @param {React.ReactNode} props.icon - Icon to display in the back button
 * @param {string} props.backButtonHref - URL for the back button navigation
 * @returns {JSX.Element} The card wrapper layout
 */
import { 
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import React from "react";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    icon: React.ReactNode;
    backButtonHref: string;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    icon,
} : CardWrapperProps) => {
    return (
        <Card className="shadow-xl md:border mt-10 border-gray-500 rounded-3xl px-3 backdrop-blur-xl bg-opacity-80">
            {/* Card header with customizable label */}
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            {/* Main content area for child components */}
            <CardContent>
                {children}
            </CardContent>
            {/* Footer with back button navigation */}
            <CardFooter>
                <BackButton icon={icon} href={backButtonHref}/>
            </CardFooter>
        </Card>
    )
}