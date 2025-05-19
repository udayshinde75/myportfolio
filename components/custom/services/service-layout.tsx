/**
 * Service Layout Component
 * 
 * This component serves as the main container for displaying all services in a portfolio.
 * It handles data fetching, loading states, and animated rendering of individual service components.
 * 
 * Features:
 * - Dynamic data fetching from API
 * - Loading state management
 * - Animated entrance effects using Framer Motion
 * - Responsive layout with container width
 * - Error handling with toast notifications
 * - Staggered animation for service items
 * 
 * @returns {JSX.Element} A container with animated service components
 */

"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import Service from "./service";
import { ServiceProps } from "./service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// SEO metadata for the services page
export const metadata: Metadata = {
  title: "Services - Uday Shinde Portfolio",
  description: "Explore the professional services offered by Uday Shinde, including software development, web development, and technical consulting.",
  keywords: ["services, software development, web development, Uday Shinde","backend development","full stack development","Next.js","React","Node.js","MongoDB","Tailwind CSS","TypeScript","GitHub","recruitment","client services"],
  openGraph: {
    title: "Services - Uday Shinde Portfolio",
    description: "Explore the professional services offered by Uday Shinde, including software development, web development, and technical consulting.",
    type: "website",
  },
};

export default function ServiceLayout() {
  // State management for services data and loading state
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services data from API on component mount
  useEffect(() => {
    fetch("/api/service")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          toast.error("Unexpected response format");
          console.error("Service API response was not an array:", data);
        }
      })
      .catch(() => toast.error("Failed to fetch Services"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-600">Loading Services...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex-col pb-5 container-width"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {services.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-gray-600">Loading Services...</p>
        </div>
      ) : (
        services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Service
              key={service.title}
              title={service.title}
              Experience={service.Experience}
              InfoForRecruiters={service.InfoForRecruiters}
              InfoForClients={service.InfoForClients}
            />
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
