import SiteNav from "@/components/custom/site/SiteNav";
import "@/styles/globals.css";
import { Toaster } from 'sonner';
import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";

// Typefaces: a tight grotesk for display/body, a mono for small labels and
// an italic serif for accents. Exposed as CSS variables for Tailwind.
const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Applies the saved theme before first paint so there's no flash.
// Dark is the default; the choice is stored by the theme switch in the nav.
const themeScript = `(function(){try{var t=localStorage.getItem('ui-theme');document.documentElement.classList.toggle('dark',t!=='light');}catch(e){document.documentElement.classList.add('dark');}})();`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
    { media: "(prefers-color-scheme: light)", color: "#f4f2ee" },
  ],
};

// SEO and metadata configuration for the entire application
export const metadata: Metadata = {
  // Default title and template for all pages
  title: {
    default: "Uday Shinde | Portfolio",
    template: "%s | Uday Shinde"
  },
  // Main description for search engines and social sharing
  description: "Welcome to my portfolio website. Explore my projects, skills, and experience in software development.",
  // Favicon configuration
  icons: {
    icon: '/assets/images/myprofile.png',
    shortcut: '/assets/images/myprofile.png',
    apple: '/assets/images/myprofile.png',
  },
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
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body className="min-h-screen overflow-x-clip">
          <SiteNav />
          {children}
          {/* Toast notifications component for user feedback */}
          <Toaster position="bottom-center" />
        </body>
    </html>
  );
}