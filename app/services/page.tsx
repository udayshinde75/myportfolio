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
import Profile from "@/components/custom/herosection/Profile";
import { Line } from "@/components/custom/navbar/line";
import ServiceLayout from "@/components/custom/services/service-layout";
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
    <section className="w-full h-full flex-center flex-col ">
      {/* Profile section with service-specific configuration */}
      <Profile textAlignment="text-justify" showProfilePicture={false} showBio={false} showService={true}/>
      <Line />
      {/* Main services layout */}
      <ServiceLayout />
      <Line />
    </section>
  );
}
