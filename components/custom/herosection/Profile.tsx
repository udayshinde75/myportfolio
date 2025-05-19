/**
 * Profile Component
 * 
 * A dynamic profile component that displays user information with customizable sections
 * Features:
 * - Dynamic data fetching from API
 * - Animated profile image using Framer Motion
 * - Type animation for role display
 * - Customizable sections (bio, services, buttons)
 * - Responsive layout and typography
 * - Loading state handling
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.showProfilePicture - Whether to display the profile picture
 * @param {boolean} [props.showButtons=false] - Whether to show action buttons
 * @param {boolean} [props.showBio=true] - Whether to display the bio section
 * @param {boolean} [props.showService=false] - Whether to display the services section
 * @param {string} [props.textAlignment] - Text alignment for content
 * @returns {JSX.Element} The profile layout
 */
"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProfileActions from "./ProfileActions";
import { Metadata } from "next";

// SEO metadata for the profile section
export const metadata: Metadata = {
    title: "Profile - Uday Shinde",
    description: "Professional profile showcasing skills, experience, and services in software development and engineering.",
    keywords: ["profile", "software engineer", "web developer", "android developer", "portfolio"],
    openGraph: {
        title: "Profile - Uday Shinde",
        description: "Professional profile showcasing skills, experience, and services in software development and engineering.",
        type: "profile",
        images: [
            {
                url: "/assets/images/logo.svg",
                width: 1200,
                height: 630,
                alt: "Uday Shinde Profile"
            }
        ]
    }
};

interface ProfileProps {
    showProfilePicture: boolean;
    showButtons?: boolean;
    showBio?: boolean;
    showService?: boolean;
    textAlignment?: string;
}

export default function Profile({
    showProfilePicture,
    showButtons = false,
    showBio = true,
    showService = false,
    textAlignment,
}: ProfileProps) {
    // State management for loading and user data
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        name: "",
        email: "",
        profilePicture: "",
        resumeLink: "",
        bio: "",
    });

    /**
     * Fetches user profile data from the API
     * Updates state with user information
     * Handles loading states and errors
     */
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/home/profile");
                const data = await res.json();
                if (res.ok) {
                    setUser({
                        name: data.name || "",
                        email: data.email || "",
                        profilePicture: data.profilePicture || "",
                        resumeLink: data.resumeLink || "",
                        bio: data.bio || "",
                    });
                } else {
                    console.log(data.error || "Could not fetch user data!");
                }
            } catch (err) {
                console.log("Error in loading profile on home page : " + err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Show loading state while fetching data
    if (loading) {
        return (
            <section className="w-full min-h-screen flex-center flex-col">
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <>
            <section className="pt-16 pb-5 flex flex-col items-center text-center container-width">
                {/* Profile picture section with animation */}
                {showProfilePicture && (
                    <>
                        {user.profilePicture && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl"
                            >
                                <Image
                                    src={user.profilePicture}
                                    alt={`${user.name}'s Profile Picture`}
                                    fill
                                    className="object-cover"
                                    priority // Prioritize loading of profile image
                                />
                            </motion.div>
                        )}
                    </>
                )}

                {/* Main content section with animations */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`mt-6 max-w-full overflow-x-auto ${textAlignment || "text-center"}`}
                >
                    {/* Dynamic heading with gradient text and type animation */}
                    <h1 className={`text-4xl sm:text-5xl font-bold leading-tight whitespace-nowrap ${textAlignment}`}>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 dark:from-gray-200 via-gray-500 dark:via-gray-200 to-gray-600 dark:to-gray-200 pt-16">
                            Hello, I&apos;m{" "}
                        </span>
                        <br />
                        <TypeAnimation
                            sequence={[
                                user.name,
                                1500,
                                "Web Developer",
                                1500,
                                "Android Developer",
                                1500,
                                "Software Engineer",
                                1500,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="text-primary inline-block"
                        />
                    </h1>

                    {/* Bio section with responsive text */}
                    {showBio && (
                        <div className="mt-6">
                            <h2 className={`text-3xl font-semibold ${textAlignment}`}>About Me</h2>
                            <p className={`text-muted-foreground mt-2 md:text-lg text-sm mx-auto ${textAlignment}`}>{user.bio}</p>
                        </div>
                    )}

                    {/* Services section with responsive text */}
                    {showService && (
                        <div className="mt-6">
                            <h2 className={`text-3xl font-semibold ${textAlignment}`}>Services I Provide</h2>
                            <p className={`text-muted-foreground mt-2 md:text-lg text-sm mx-auto ${textAlignment}`}>
                                I create seamless full-stack apps, robust APIs, and efficient databases using C#, Node.js, and more, ensuring smooth functionality from front-end to back-end!💻
                            </p>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Action buttons section */}
            {showButtons && (
                <ProfileActions ReadMore={true} user={user} />
            )}
        </>
    );
}
