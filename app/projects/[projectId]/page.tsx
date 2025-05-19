/**
 * Project Detail Page Component
 * 
 * Dynamic page component that displays detailed information about a specific project
 * Features:
 * - Dynamic routing based on projectId
 * - Server-side rendering for better performance
 * - Renders ProjectInfo component with project details
 * 
 * @param {Object} params - Route parameters containing projectId
 * @param {Promise<{projectId: string}>} params.projectId - The ID of the project to display
 * @returns {JSX.Element} The project detail page layout
 */
import ProjectInfo from "@/components/custom/projects/project-info";

export default async function ProjectSection({ params }: { params: Promise<{ projectId: string }> }) {
  const {projectId} = await params;
  return <ProjectInfo id={projectId} />;
}
