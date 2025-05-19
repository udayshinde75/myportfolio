import Navbar from "@/components/custom/navbar/Navbar";
import "@/styles/globals.css";
import { Toaster } from 'sonner';
import { ReactNode } from "react";
import { Metadata } from "next";

// SEO and metadata configuration for the entire application
export const metadata: Metadata = {
  // Default title and template for all pages
  title: {
    default: "Uday Shinde | Portfolio",
    template: "%s | Uday Shinde"
  },
  // Main description for search engines and social sharing
  description: "Welcome to my portfolio website. Explore my projects, skills, and experience in software development.",
  // Keywords for SEO optimization
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
  // Author information
  authors: [{ name: "Uday Shinde" }],
  creator: "Uday Shinde",
  // OpenGraph metadata for better social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://udayshinde.in",
    title: "Uday Shinde | Portfolio",
    description: "Welcome to my portfolio website. Explore my projects, skills, and experience in software development.",
    siteName: "Uday Shinde Portfolio",
    images: [
      {
        url: "https://drive.google.com/thumbnail?id=1T4rXbHVTUfVPCF3Kou5ySKnLkOM_bOHk", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "Uday Shinde Portfolio - Full Stack Developer",
        type: "image/jpeg",
      },
    ],
  },
  // Search engine crawling instructions
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

// Root layout component that wraps the entire application
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
        <body
          // Main layout styling with dark mode support and gradient background
          className="transition-colors duration-1000 flex h-full items-center justify-center flex-col relative bg-gradient-to-br from-gray-300 dark:from-gray-900 via-gray-300 dark:via-gray-900 to-gray-300 dark:to-gray-900 py-12 pb-32"
        >
          <Navbar/>
          {children}
          {/* Toast notifications component for user feedback */}
          <Toaster position="top-center" richColors />
        </body>
    </html>
  );
}