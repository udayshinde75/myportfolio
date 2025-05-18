"use client"

import { ProjectForm } from "@/components/custom/dashboard/project-form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPageContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true)
  const projectId = searchParams.get('id');
  console.log("Project ID:", projectId)
  const[project, setProject] = useState({
    _id:"",
    projectName: "",
    projectDescription: "",
    skills: [],
    githubLink: "",
    liveDemo: "",
    readmeFile: "",
    projectPictureUrl: "",
  })

  useEffect(() => {
    if (!projectId) {
      setLoading(false)
      return
    };
  
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/dashboard/projects/${projectId}`);
        if (res.status === 404) {
          setLoading(false)
          return
        }; // project not found = new project
  
        const data = await res.json();
        if (res.ok) {
           setProject({
            _id:data._id,
            projectName: data.projectName,
            projectDescription: data.projectDescription,
            skills:data.skills,
            githubLink: data.githubLink,
            liveDemo: data.liveDemo,
            readmeFile: data.readmeFile,
            projectPictureUrl: data.projectPictureUrl,
           })
           console.log("Project:"+project);
        } else {
          setLoading(false)
          return
        }
      } catch (err) {
        console.log("projects/new useEffect used to get project:", err)
      } finally {
        setLoading(false)
      }
    };
  
    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <section className="container-width md:h-[90vh] h-full lg:mt-0 mt-10 flex-center gap-y-6 flex-col lg:flex-row">
        <ProjectForm initialData={project}/>
      </section>
    </>
  );
}
