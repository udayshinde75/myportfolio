/**
 * Hero Section Component
 * 
 * A dynamic hero section component that showcases the main profile
 * Features:
 * - Animated profile image using Framer Motion
 * - Dynamic text animation using TypeAnimation
 * - Responsive layout and typography
 * - Gradient text effects
 * - Call-to-action buttons
 * 
 * @returns {JSX.Element} The hero section layout
 */
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Metadata } from "next";

// SEO metadata for the hero section
export const metadata: Metadata = {
    title: "Uday Shinde - Software Engineer & Developer",
    description: "Professional portfolio of Uday Shinde, a skilled software engineer specializing in web development, Android development, and data analysis.",
    keywords: ["software engineer", "web developer", "android developer", "data analyst", "ML engineer", "portfolio"],
    openGraph: {
        title: "Uday Shinde - Software Engineer & Developer",
        description: "Professional portfolio showcasing expertise in web development, Android development, and data analysis.",
        type: "website",
        images: [
            {
                url: "/assets/images/logo.svg",
                width: 1200,
                height: 630,
                alt: "Uday Shinde Portfolio"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Uday Shinde - Software Engineer & Developer",
        description: "Professional portfolio showcasing expertise in web development, Android development, and data analysis.",
        images: ["/assets/images/logo.svg"]
    }
};

export default function HeroSection() {
    return (
        <section className="py-16 flex flex-col items-center text-center">
            {/* Animated profile image with responsive sizing */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl"
            >
                <Image
                    src="/assets/images/logo.svg"
                    alt="Uday Shinde - Software Engineer"
                    fill
                    className="object-cover"
                    priority // Prioritize loading of hero image
                />
            </motion.div>

            {/* Main content section with animations */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mt-6 max-w-full overflow-x-auto"
            >
                {/* Dynamic heading with gradient text and type animation */}
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight whitespace-nowrap">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 dark:from-gray-200 via-gray-500 dark:via-gray-200 to-gray-600 dark:to-gray-200 pt-16">
                        Hello, I&apos;m{" "}
                    </span>
                    <br />
                    <TypeAnimation
                        sequence={[
                            "Uday",
                            1500,
                            "Web Developer",
                            1500,
                            "Android Developer",
                            1500,
                            "Software Engineer",
                            1500,
                            "Data Analyst",
                            1500,
                            "ML Engineer",
                            1500,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        className="text-primary inline-block"
                    />
                </h1>

                {/* About section with responsive text */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">About Me</h2>
                    <p className="text-muted-foreground mt-2 px-6 md:text-lg text-sm max-w-2xl mx-auto">
                        I am a highly skilled software engineer with experience in web and mobile
                        development. With expertise in technologies like React, Next.js, Node.js, and
                        Android development, I create seamless and high-performance applications. My
                        focus is on crafting innovative solutions that merge functionality with
                        user-friendly experiences.
                    </p>
                </div>

                {/* Call-to-action buttons with different variants */}
                <div className="flex flex-col gap-4 justify-center">
                    <Button asChild variant="link" className="mt-4 text-primary text-lg">
                        <Link href="/about">Read More</Link>
                    </Button>
                    <Button asChild className="px-6 py-3 mx-auto">
                        <Link href="/#contact">Hire Me</Link>
                    </Button>
                    <Button asChild variant="outline" className="px-6 py-3 mx-auto">
                        <Link href="/resume.pdf" target="_blank">Download CV</Link>
                    </Button>
                </div>
            </motion.div>
        </section>
    );
}
