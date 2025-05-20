/**
 * Project Info Component
 * 
 * A detailed view component for displaying comprehensive project information
 * Features:
 * - Dynamic data fetching from API
 * - Markdown rendering for README content
 * - Skill badges display
 * - External links (GitHub, Live Demo)
 * - Loading state handling
 * - Error handling for README fetching
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the project
 * @returns {JSX.Element} The project information layout
 */
"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";

// SEO metadata for project info
export const metadata: Metadata = {
    title: "Project Details - Uday Shinde Portfolio",
    description: "Detailed information about software development projects, including technologies used, features, and implementation details.",
    keywords: ["project details", "software development", "web development", "Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "TypeScript", "portfolio", "GitHub", "Live Demo", "Project Details"],
    openGraph: {
        title: "Project Details - Uday Shinde Portfolio",
        description: "Detailed information about software development projects",
        type: "website"
    }
};

// Project data type definition
type Project = {
    projectName: string;
    projectDescription: string;
    skills: string[];
    githubLink: string;
    liveDemo: string;
    readmeFile: string;
    projectPictureUrl: string;
};

export default function ProjectInfo({ id }: { id: string }) {
    // State management for project data and markdown content
    const [project, setProject] = useState<Project | null>(null);
    const [markdown, setMarkdown] = useState<string>("");

    // Fetch project data and README content
    useEffect(() => {
        async function fetchProject() {
            try {
                // Fetch project data from API
                const res = await fetch(`/api/projects/${id}`);
                if (!res.ok) throw new Error("Failed to fetch project");
                const data = await res.json();
                setProject(data);
                
                // Fetch and process README content if available
                if (data.readmeFile) {
                    const md = await fetch(data.readmeFile);
                    const text = await md.text();
                    
                    // Handle HTML response instead of markdown
                    if (text.includes("<html")) {
                        setMarkdown("# ❌ Unable to load README\nIt looks like the URL points to an HTML page, not a markdown file.");
                    } else {
                        setMarkdown(text);
                    }
                }
            } catch (err) {
                console.error("Error fetching project:", err);
            }
        }

        fetchProject();
    }, [id]);

    // Show loading state while fetching data
    if (!project) {
        return <p className="text-center mt-10 text-lg text-gray-500">Loading project...</p>;
    }

    return (
        <Card className="w-full max-w-4xl mx-auto p-4 space-y-6 m-4 rounded-2xl transition-transform shadow-xl mt-12 backdrop-blur-3xl bg-opacity-40">
            <CardContent>
                {/* Project Title and Description */}
                <h1 className="text-3xl font-bold mb-2">{project.projectName}</h1>
                <p className="text-muted-foreground mb-4">{project.projectDescription}</p>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                            {skill}
                        </Badge>
                    ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4 mb-6">
                    <Link href={project.githubLink} target="_blank">
                        <Badge variant="secondary" className="text-xs cursor-pointer">GitHub</Badge>
                    </Link>
                    {project.liveDemo && (
                        <Link href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                            <Badge variant="secondary" className="text-xs cursor-pointer">
                                Live Demo
                            </Badge>
                        </Link>
                    )}
                </div>

                {/* README Content */}
                <div className="prose dark:prose-invert max-w-none">
                    <h2>📄 README</h2>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                </div>
            </CardContent>
        </Card>
    );
}
