import ProjectInfo from "@/components/custom/projects/project-info";

export default async function ProjectSection({ params }: { params: Promise<{ projectId: string }> }) {
  const {projectId} = await params;
  return <ProjectInfo id={projectId} />;
}
