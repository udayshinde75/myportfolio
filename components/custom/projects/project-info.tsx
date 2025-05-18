"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

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
  const [project, setProject] = useState<Project | null>(null);
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    async function fetchProject() {
      try {
        
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        console.log(data)
        setProject(data);
        
        if (data.readmeFile) {
          const md = await fetch(data.readmeFile);
          const text = await md.text();
          
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

  if (!project) {
    return <p className="text-center mt-10 text-lg text-gray-500">Loading project...</p>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto p-4 space-y-6 rounded-2xl transition-transform shadow-xl mt-12 backdrop-blur-3xl bg-opacity-40">
      <CardContent>
        <h1 className="text-3xl font-bold mb-2">{project.projectName}</h1>
        <p className="text-muted-foreground mb-4">{project.projectDescription}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill, idx) => (
            <Badge key={idx} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <Link href={project.githubLink} target="_blank">
            <Badge className="hover:!bg-gray-500 cursor-pointer">GitHub</Badge>
          </Link>
          {project.liveDemo && (
            <Link href={project.liveDemo} target="_blank" rel="noopener noreferrer">
              <Badge variant="secondary" className="text-xs cursor-pointer">
                Live Demo
              </Badge>
            </Link>
          )}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>📄 README</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
