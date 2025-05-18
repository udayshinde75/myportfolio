"use client"; // required if using motion in app directory

import { motion } from "framer-motion";
import ProjectCard, { ProjectCardProps } from "@/components/custom/projects/projeect-card";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ProjectLayout() {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(true);
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
        .finally(()=>{
          setLoading(false)
        })
    }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-600">Loading Projects...</p>
      </div>
    );
  }  
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">My Projects</h1>
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
