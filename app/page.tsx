/**
 * Home page: a single scrolling page with every section of the portfolio.
 * All content is loaded from the database through the public /api routes.
 */

import { Metadata } from "next";
import Hero from "@/components/custom/site/Hero";
import WorkSection from "@/components/custom/site/WorkSection";
import SkillsMarquee from "@/components/custom/site/SkillsMarquee";
import AboutSection from "@/components/custom/site/AboutSection";
import JourneySection from "@/components/custom/site/JourneySection";
import ServicesSection from "@/components/custom/site/ServicesSection";
import ContactSection from "@/components/custom/site/ContactSection";
import SiteFooter from "@/components/custom/site/SiteFooter";

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
    <main>
      <Hero />
      <WorkSection limit={4} />
      <SkillsMarquee />
      <AboutSection />
      <JourneySection />
      <ServicesSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
