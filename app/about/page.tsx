import Career from "@/components/custom/about/Career";
import Education from "@/components/custom/about/Education";
import Profile from "@/components/custom/herosection/Profile";
import { Line } from "@/components/custom/navbar/line";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
 * AboutPage Component
 * 
 * Renders the About page of the portfolio website, showcasing:
 * - Professional profile information
 * - Career history and experience
 * - Educational background
 * - Navigation to Services page
 * 
 * @returns {JSX.Element} The About page layout
 */
export default function AboutPage() {
  return (
    <section className="w-full h-full flex-center flex-col">
      {/* Profile section with text alignment and no profile picture */}
      <Profile
        textAlignment="text-justify"
        showProfilePicture={false}
      />
      <Line />
      {/* Career history and experience section */}
      <Career />
      <Line />
      {/* Educational background section */}
      <Education />
      {/* Navigation button to Services page */}
      <div className="flex flex-col gap-4 justify-center">
        <Button asChild variant={"secondary"} className=" text-sm">
          <Link href="/services">
            Services<ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
