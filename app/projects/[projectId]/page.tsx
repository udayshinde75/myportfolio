/**
 * Project detail page. The project's data and README are loaded on the
 * client by <ProjectDetail>.
 */
import ProjectDetail from "@/components/custom/site/ProjectDetail";
import SiteFooter from "@/components/custom/site/SiteFooter";

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return (
    <main>
      <ProjectDetail id={projectId} />
      <SiteFooter />
    </main>
  );
}
