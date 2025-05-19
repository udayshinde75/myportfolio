/**
 * Project Layout Component
 * 
 * A layout component that displays a grid of project cards
 * Features:
 * - Dynamic data fetching from API
 * - Responsive grid layout
 * - Animated entrance for each project card
 * - Loading state handling
 * - Error handling with toast notifications
 * - Infinite scroll support
 * 
 * @returns {JSX.Element} The project layout grid
 */
"use client"; // required if using motion in app directory

import { motion } from "framer-motion";
import ProjectCard, { ProjectCardProps } from "@/components/custom/projects/projeect-card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Metadata } from "next";

// SEO metadata for project layout
export const metadata: Metadata = {
    title: "Projects Gallery - Uday Shinde Portfolio",
    description: "Browse through a collection of software development projects showcasing web applications work.",
    keywords: ["projects gallery", "portfolio", "software development", "web development", "Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "TypeScript","GitHub", "Live Demo", "Project Details"],
    openGraph: {
        title: "Projects Gallery - Uday Shinde Portfolio",
        description: "Browse through a collection of software development projects",
        type: "website"
    }
};

export default function ProjectLayout() {
    // State management for projects data and loading state
    const [projects, setProjects] = useState<ProjectCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch projects data from API
    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    toast.error("Unexpected response format");
                    console.error("Project API response was not an array:", data);
                }
            })
            .catch(() => toast.error("Failed to fetch Projects"))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Show loading state while fetching data
    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-gray-600">Loading Projects...</p>
            </div>
        );
    }

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            {/* Section Title */}
            <h1 className="text-3xl font-bold text-center mb-10">My Projects</h1>

            {/* Projects Grid */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        <ProjectCard
                            _id={project._id}
                            projectPictureUrl={project.projectPictureUrl}
                            projectName={project.projectName}
                            projectDescription={project.projectDescription}
                            skills={project.skills}
                            githubLink={project.githubLink}
                            liveDemo={project.liveDemo}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
