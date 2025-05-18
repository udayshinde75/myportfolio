"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin, Github} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const XIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M4.2 3h4.6l3.1 4.3L15.3 3h4.6l-5.9 7.8L20.9 21h-4.7l-3.7-5.1L8.8 21H4.2l6.4-8.4L4.2 3zm3.1 1.4 5.3 7.1-5.3 7.2h1.7l4.5-6.2 4.5 6.2h1.7l-5.3-7.2 5.3-7.1H16l-4.1 5.6L8.6 4.4H7.3z" />
  </svg>
);

const ICONS_MAP: Record<string, JSX.Element> = {
  email: <Mail size={28} />,
  twitter: XIcon,
  instagram: <Instagram size={28} />,
  linkedin: <Linkedin size={28} />,
  github: <Github size={28} />,
};

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState<{ type: string; link: string }[]>([]);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/home/profile");
        const data = await res.json();

        if (res.ok) {
          const links: { type: string; link: string }[] = [];

          if (data.email) links.push({ type: "email", link: `mailto:${data.email}` });
          if (data.twitter) links.push({ type: "twitter", link: data.twitter });
          if (data.instagram) links.push({ type: "instagram", link: data.instagram });
          if (data.linkedin) links.push({ type: "linkedin", link: data.linkedin });
          if (data.github) links.push({ type: "github", link: data.github });

          setContactData(links);
        } else {
          console.log(data.error || "Could not fetch user data!");
        }
      } catch (err) {
        console.log("Error in loading profile on home page : " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div className="mt-20 flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-4xl font-bold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h1>
      <motion.p
        className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Have a question or want to work together? Connect through any platform!
      </motion.p>

      <div className="flex flex-col gap-y-5 items-center">
        {contactData.map((item, index) => (
          <GlowCard key={`${item.type}-${index}`} item={item} index={index} />
        ))}
      </div>
      
    </div>
  );
}

// ✨ GlowCard component with cursor glow + 30/70 layout
function GlowCard({ item, index }: { item: { type: string; link: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <a
        href={item.link}
        target={item.type === "email" ? "_self" : "_blank"}
        rel="noopener noreferrer"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="relative w-60 rounded-2xl p-[2px] transition-all duration-300"
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.3), transparent 80%)`,
            }}
          ></div>

          <Card
            className="relative z-10 backdrop-blur-md bg-white/30 dark:bg-gray-300/20 
            border border-stone-200 dark:border-stone-700 hover:scale-[1.1] transition-all duration-300"
          >
            <CardContent className="flex w-full p-5">
              {/* Icon Section */}
              <div className="w-[40%] flex items-center justify-center text-blue-600 dark:text-blue-400">
                {ICONS_MAP[item.type]}
              </div>

              {/* Text Section */}
              <div className="w-[60%] flex items-center text-lg font-medium capitalize text-gray-900 dark:text-gray-200">
                {item.type}
              </div>
            </CardContent>
          </Card>
        </div>
      </a>
    </motion.div>
  );
}
