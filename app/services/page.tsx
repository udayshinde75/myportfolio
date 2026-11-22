/**
 * Services Page Component
 * 
 * Main page component that displays all services offered
 * Features:
 * - Renders Profile component with service-specific configuration
 * - Displays ServiceLayout component for service details
 * - SEO metadata for better search engine visibility
 * - Server-side rendering for better performance
 * - Responsive layout with decorative line separators
 * 
 * @returns {JSX.Element} The services page layout
 */
import ServicesSection from "@/components/custom/site/ServicesSection";
import ContactSection from "@/components/custom/site/ContactSection";
import SiteFooter from "@/components/custom/site/SiteFooter";
import { Metadata } from 'next';

/**
 * SEO metadata for the services page
 * Provides search engines with information about the page content
 */
export const metadata: Metadata = {
  title: 'Services | Portfolio',
  description: 'Explore the professional services I offer, including software development, web development, and backend development.',
  keywords: 'software development services, web development, programming services',
  openGraph: {
    title: 'Services | Portfolio',
    description: 'Explore the professional services I offer, including software development, web development, and backend development.',
    type: 'website',
  },
};

export default function Services() {

  return (
    <main className="pt-16">
      <ServicesSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
