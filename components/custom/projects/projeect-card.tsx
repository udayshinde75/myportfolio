import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export interface ProjectCardProps {
    _id:string;
    projectPictureUrl: string;
    projectName: string;
    projectDescription: string;
    skills: string[];
    githubLink: string;
    liveDemo: string;
};

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
    <Card className="w-full max-w-xs rounded-2xl transition-transform hover:scale-105 shadow-xl border-stone-600 mt-10 backdrop-blur-3xl bg-opacity-40 ">
      <Image
        src={projectPictureUrl}
        alt={projectName}
        width={400}
        height={250}
        className="rounded-t-2xl object-cover"
      />
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{projectName}</h2>
        <p className="text-sm text-muted-foreground mb-4">{projectDescription}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {skills.map((skill, index) => (
            <Badge variant="secondary" className="text-xs" key={index}>
            {skill}
            </Badge>
          ))}
          
        </div>
        <hr className="border-gray-500 mb-3" />

        {/* Links */}
        <div className="flex gap-3">
        <Link href={githubLink} rel="noopener noreferrer">
            <Badge variant="secondary" className="text-xs cursor-pointer">
            GitHub
            </Badge>
        </Link>
        {liveDemo?? (
          <Link href={liveDemo} target="_blank" rel="noopener noreferrer">
            <Badge variant="secondary" className="text-xs cursor-pointer">
            Live Demo
            </Badge>
        </Link>
        )}
        <Link href={`/projects/${_id}`} target="_blank" rel="noopener noreferrer">
            <Badge variant="secondary" className="text-xs cursor-pointer">
            Project Info
            </Badge>
        </Link>
        
        </div>
      </CardContent>
    </Card>
  );
}
