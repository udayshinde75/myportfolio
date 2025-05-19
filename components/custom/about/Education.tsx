/**
 * Education Component
 * 
 * A client-side component that displays educational background information
 * Features:
 * - Fetches and displays education history
 * - Animated transitions using Framer Motion
 * - Responsive layout with university icons
 * - Skill tags for each education entry with SEO optimization
 * - Loading and empty states
 * 
 * @returns {JSX.Element} The education section layout
 */
"use client"

import { motion } from "framer-motion";
import { VerticalLine } from "../navbar/line";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe } from "lucide-react";
import SkillTagsWrapper from "./SkillTagsWrapper";
import Image from "next/image";

/**
 * Type definition for education data structure
 * Represents a single education entry with all its properties
 */
interface EducationType {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    universityName: string;
    universityIcon: string;
    universityLink?: string;
    location:string;
    description: string;
    skills: string[];
    proof?:string;
    score:string;
    scoreType:string;
}

export default function Education() {
    // State management for education data and loading state
    const [education, setEducation] = useState<EducationType[]>([]);
    const [loading, setLoading] = useState(true);

    /**
     * Effect hook to fetch education data
     * Fetches data on component mount and updates state
     * Handles loading states and error cases
     */
    useEffect(() => {
        fetch("api/about/education")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setEducation(data);
                    console.log("Education Data:", data);
                } else {
                    toast.error("Unexpected response format");
                    console.error("Education API response was not an array:", data);
                }
            })
            .catch(() => toast.error("Failed to fetch education"))
            .finally(() => setLoading(false));
    }, []);
    
    return (
        <motion.div
            className="flex-col pb-5 container-width"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h2 className="text-3xl font-semibold text-justify">Education</h2>
            {loading ? (
                <p className="text-muted-foreground mt-2">Loading...</p>
            ) : education.length === 0 ? (
                <p className="text-muted-foreground mt-2">No education details added yet.</p>
            ) : (
                education.map((edu, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        key={edu._id}
                    >
                        <div className="mt-2">
                            {/* University information with icon */}
                            <div className="flex items-center justify-center gap-x-2">
                                <div className="rounded-full overflow-hidden">
                                    <Image
                                        src={edu.universityIcon}
                                        alt="University Icon"
                                        height={100}
                                        width={100}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-full mx-auto">
                                    <div className="flex justify-between items-center">
                                        <h2 className="md:text-lg text-xs font-semibold text-left">{edu.title} <br/> {edu.location}</h2>
                                        <h2 className="md:text-lg text-xs font-semibold text-right">{edu.startDate}-{edu.endDate}</h2>
                                    </div>
                                </div>
                            </div>
                            {/* University link */}
                            <Button variant={"link"} className="p-0 mt-2">
                                <Link href={edu.universityLink || ""} className="p-0 md:text-lg text-xs flex flex-center gap-x-2">{edu.universityName} <Globe /></Link>
                            </Button>
                            {/* Education details */}
                            <p className="text-muted-foreground mt-2 md:text-lg text-xs text-justify">{edu.description}</p>
                            <h2 className="text-sm font-semibold text-left">{edu.scoreType} - {edu.score}</h2>
                            {/* Skills section with SEO optimization */}
                            <div>
                                <SkillTagsWrapper skills={edu.skills} />
                            </div>
                            <VerticalLine />
                        </div>
                    </motion.div>
                ))
            )}
        </motion.div>
    );
}