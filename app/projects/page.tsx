/**
 * Projects Page Component
 * 
 * Main page component that displays all portfolio projects
 * Features:
 * - Renders ProjectLayout component
 * - SEO metadata for better search engine visibility
 * - Server-side rendering for better performance
 * 
 * @returns {JSX.Element} The projects page layout
 */
import WorkSection from "@/components/custom/site/WorkSection";
import ContactSection from "@/components/custom/site/ContactSection";
import SiteFooter from "@/components/custom/site/SiteFooter";
import { Metadata } from 'next';

/**
 * SEO metadata for the projects page
 * Provides search engines with information about the page content
 */
export const metadata: Metadata = {
  title: 'My Projects | Portfolio',
  description: 'Explore my portfolio of projects showcasing my skills and experience in software development.',
  keywords: 'portfolio projects, software development, web development, programming projects',
  openGraph: {
    title: 'My Projects | Portfolio',
    description: 'Explore my portfolio of projects showcasing my skills and experience in software development.',
    type: 'website',
  },
};

export default function ProjectSection() {
  return (
    <main className="pt-16">
      <WorkSection label="All projects" title="projects" />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
