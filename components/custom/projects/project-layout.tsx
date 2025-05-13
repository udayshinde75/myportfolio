"use client"; // required if using motion in app directory

import { motion } from "framer-motion";
import ProjectCard from "@/components/custom/projects/projeect-card";

const projects = [
  {
    imageUrl: "/assets/images/images.jpeg",
    title: "Portfolio Website",
    description: "A modern personal portfolio built with Next.js and Tailwind CSS.",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    imageUrl: "/assets/images/images.jpeg",
    title: "E-commerce App",
    description: "A full-stack e-commerce app with cart, payments, and admin dashboard.",
    techStack: ["React", "Node.js", "MongoDB"],
  },
  {
    imageUrl: "/assets/images/images.jpeg",
    title: "E-commerce App",
    description: "A full-stack e-commerce app with cart, payments, and admin dashboard.",
    techStack: ["React", "Node.js", "MongoDB"],
  },
  
];

export default function ProjectLayout() {
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
              imageUrl={project.imageUrl}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
