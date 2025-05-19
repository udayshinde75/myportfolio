/**
 * Root Page Component
 * 
 * This is the main landing page of the portfolio website. It serves as the entry point
 * and showcases the key sections of the portfolio including the profile and projects.
 * 
 * Features:
 * - Profile section with customizable display options
 * - Visual separator using Line component
 * - Project showcase section
 * - Responsive layout with flex positioning
 * - SEO optimization for better visibility
 * 
 * @returns {JSX.Element} The main landing page layout
 */

import { Metadata } from "next";
import Profile from "@/components/custom/herosection/Profile";
import { Line } from "@/components/custom/navbar/line";
import ProjectLayout from "@/components/custom/projects/project-layout";

// SEO metadata for the root page
export const metadata: Metadata = {
  title: "Uday Shinde - Software Engineer & Full Stack Developer",
  description: "Welcome to Uday Shinde's portfolio. Explore my work as a software engineer specializing in full-stack development, web applications, and innovative solutions.",
  keywords: [
    "Uday Shinde",
    "Software Engineer",
    "Full Stack Developer",
    "Web Development",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
    "GitHub"
  ],
  authors: [{ name: "Uday Shinde" }],
  openGraph: {
    title: "Uday Shinde - Software Engineer & Full Stack Developer",
    description: "Welcome to my portfolio. Explore my work as a software engineer specializing in full-stack development, web applications, and innovative solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Uday Shinde Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uday Shinde - Software Engineer & Full Stack Developer",
    description: "Welcome to my portfolio. Explore my work as a software engineer specializing in full-stack development, web applications, and innovative solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  return (
    <section className="w-full h-full flex-center flex-col">
      {/* Profile Section with customizable display options */}
      <Profile 
        showProfilePicture={true} 
        textAlignment="text-balance" 
        showButtons
      />
      
      {/* Visual Separator */}
      <Line />
      
      {/* Project Showcase Section */}
      <ProjectLayout />
    </section>
  );
}
