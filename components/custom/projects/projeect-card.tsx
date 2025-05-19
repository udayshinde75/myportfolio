/**
 * Project Card Component
 * 
 * A reusable card component for displaying project information
 * Features:
 * - Responsive image display
 * - Skill badges with flex layout
 * - External links (GitHub, Live Demo)
 * - Project details link
 * - Hover animations
 * - Backdrop blur effect
 * 
 * @param {Object} props - Component props
 * @param {string} props._id - Unique identifier for the project
 * @param {string} props.projectPictureUrl - URL of the project's image
 * @param {string} props.projectName - Name of the project
 * @param {string} props.projectDescription - Brief description of the project
 * @param {string[]} props.skills - Array of skills used in the project
 * @param {string} props.githubLink - URL to the project's GitHub repository
 * @param {string} props.liveDemo - URL to the live demo (optional)
 * @returns {JSX.Element} The project card layout
 */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

// SEO metadata for project cards
export const metadata: Metadata = {
    title: "Projects - Uday Shinde Portfolio",
    description: "Explore my portfolio of software development projects, including web applications",
    keywords: ["projects", "portfolio", "software development", "web development", "Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "TypeScript","GitHub", "Live Demo", "Project Details"],
    openGraph: {
        title: "Projects - Uday Shinde Portfolio",
        description: "Explore my portfolio of software development projects",
        type: "website"
    }
};

export interface ProjectCardProps {
    _id: string;
    projectPictureUrl: string;
    projectName: string;
    projectDescription: string;
    skills: string[];
    githubLink: string;
    liveDemo: string;
}

export default function ProjectCard({
    _id,
    projectPictureUrl,
    projectName,
    projectDescription,
    skills,
    githubLink,
    liveDemo,
}: ProjectCardProps) {
    return (
        <Card className="w-full max-w-xs rounded-2xl transition-transform hover:scale-105 shadow-xl border-stone-600 mt-10 backdrop-blur-3xl bg-opacity-40">
            {/* Project Image */}
            <Image
                src={projectPictureUrl}
                alt={projectName}
                width={400}
                height={250}
                className="rounded-t-2xl object-cover"
                priority // Prioritize loading of project images
            />
            <CardContent className="p-4">
                {/* Project Title */}
                <h2 className="text-xl font-semibold mb-2">{projectName}</h2>
                
                {/* Project Description */}
                <p className="text-sm text-muted-foreground mb-4">{projectDescription}</p>
                
                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {skills.map((skill, index) => (
                        <Badge variant="secondary" className="text-xs" key={index}>
                            {skill}
                        </Badge>
                    ))}
                </div>
                
                {/* Divider */}
                <hr className="border-gray-500 mb-3" />

                {/* Project Links */}
                <div className="flex gap-3">
                    {/* GitHub Link */}
                    <Link href={githubLink} rel="noopener noreferrer">
                        <Badge variant="secondary" className="text-xs cursor-pointer">
                            GitHub
                        </Badge>
                    </Link>
                    
                    {/* Live Demo Link (if available) */}
                    {liveDemo && liveDemo.trim() !== "" && (
                        <Link href={liveDemo} target="_blank" rel="noopener noreferrer">
                            <Badge variant="secondary" className="text-xs cursor-pointer">
                                Live Demo
                            </Badge>
                        </Link>
                    )}
                    
                    {/* Project Details Link */}
                    <Link href={`/projects/${_id}`} rel="noopener noreferrer">
                        <Badge variant="secondary" className="text-xs cursor-pointer">
                            Project Info
                        </Badge>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
