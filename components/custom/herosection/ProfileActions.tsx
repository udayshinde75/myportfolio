/**
 * Profile Actions Component
 * 
 * A component that displays action buttons for the profile section
 * Features:
 * - Animated entrance using Framer Motion
 * - Conditional rendering of Read More button
 * - Contact and CV download actions
 * - Responsive button layout
 * - Icon integration
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.ReadMore - Whether to show the Read More button
 * @param {Object} props.user - User data object
 * @param {string} props.user.resumeLink - URL to the user's resume
 * @returns {JSX.Element} The profile actions layout
 */
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ActionProps {
    ReadMore: boolean;
    user: {
        resumeLink: string;
    }
}

export default function ProfileActions({
    ReadMore,
    user
}: ActionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-4 justify-center"
        >
            {/* Read More button with arrow icon */}
            {ReadMore && (
                <Button asChild variant="link" className="text-primary text-sm">
                    <Link href="/about">
                        Read More<ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
            )}

            {/* Contact button */}
            <Button asChild className="px-6 py-3 mx-auto">
                <Link href="/contact">Contact me</Link>
            </Button>

            {/* CV download button */}
            <Button asChild variant="outline" className="px-6 py-3 mx-auto">
                <Link href={user.resumeLink} target="_blank">
                    Download CV
                </Link>
            </Button>
        </motion.div>
    );
}
