/**
 * Career Component
 * 
 * A client-side component that displays professional work experience
 * Features:
 * - Fetches and displays job history
 * - Animated transitions using Framer Motion
 * - Responsive layout with company information
 * - Skill tags for each job entry with SEO optimization
 * - Loading and empty states
 * 
 * @returns {JSX.Element} The career section layout
 */
"use client"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {Globe} from "lucide-react"
import SkillTagsWrapper from "./SkillTagsWrapper";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { VerticalLine } from "../navbar/line";

/**
 * Type definition for job data structure
 * Represents a single job entry with all its properties
 */
interface JobType {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    companyName: string;
    companyLink?: string;
    location:string;
    description: string;
    skills: string[];
}

export default function Career() {
    // State management for jobs data and loading state
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [loading, setLoading] = useState(true);

    /**
     * Effect hook to fetch job data
     * Fetches data on component mount and updates state
     * Handles loading states and error cases
     */
    useEffect(() => {
        fetch("/api/about/career")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setJobs(data);
                } else {
                    toast.error("Unexpected response format");
                    console.error("Jobs API response was not an array:", data);
                }
            })
            .catch(() => toast.error("Failed to fetch jobs"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <motion.div
            className="flex-col pb-5 container-width"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h2 className="text-3xl font-semibold text-justify">Career</h2>
            {loading ? (
                <p className="text-muted-foreground mt-2">Loading...</p>
            ) : jobs.length === 0 ? (
                <p className="text-muted-foreground mt-2">No work experience added yet.</p>
            ) : (
                jobs.map((job) => (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        key={job._id}
                    >
                        <div className="mt-2">
                            {/* Job title and location */}
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-left">{job.title} <br/> {job.location}</h2>
                                <h2 className="text-xs font-semibold text-right">{job.startDate} - {job.endDate}</h2>
                            </div>
                            {/* Company link */}
                            <Button variant={"link"} className="p-0">
                                <Link href={job.companyLink || ""} className="p-0 flex flex-center gap-x-2">{job.companyName} <Globe /></Link>
                            </Button>
                            {/* Job description */}
                            <p className="text-muted-foreground mt-2 md:text-lg text-sm text-justify">{job.description}</p>
                            {/* Skills section with SEO optimization */}
                            <div className="">
                                <SkillTagsWrapper skills={job.skills} />
                            </div>
                            <VerticalLine />
                        </div>
                    </motion.div>
                ))
            )}
        </motion.div>
    );
}