import AboutSection from "@/components/custom/site/AboutSection";
import JourneySection from "@/components/custom/site/JourneySection";
import ContactSection from "@/components/custom/site/ContactSection";
import SiteFooter from "@/components/custom/site/SiteFooter";
import { Metadata } from "next";

/**
 * Metadata for the About page
 * Provides SEO information for search engines and social media sharing
 */
export const metadata: Metadata = {
  title: "About Me | Portfolio",
  description: "Learn about my professional journey, education, and career experience. Discover my background, skills, and expertise in software development.",
  keywords: [
    "Uday Shinde",
    "Portfolio",
    "Software Developer",
    "Web Development",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB",
    "Express.js",
    "JavaScript Developer",
    "TypeScript Developer",
    "Next.js Developer",
    "ASP.NET Core MVC Developer",
    "ASP.NET Developer",
    ".NET Developer",
    "C# Developer",
    "MVC Architecture",
    "Entity Framework",
    "SQL Server",
    "Freelance Developer",
    "Remote Developer",
    "Web App Developer",
    "Modern Web Development",
    "Responsive Web Design",
    "UI/UX Developer",
    "REST API Developer",
    "Clean Code",
    "Scalable Web Apps",
    "Cloud Development",
    "GitHub Portfolio"
  ],
  openGraph: {
    title: "About Me | Portfolio",
    description: "Learn about my professional journey, education, and career experience.",
    type: "website",
  },
};

/**
 * About page: bio and stats, then the work & education timeline.
 */
export default function AboutPage() {
  return (
    <main className="pt-16">
      <AboutSection />
      <JourneySection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
