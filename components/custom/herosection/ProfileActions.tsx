"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ActionProps{
    ReadMore: boolean;
}

export default function ProfileActions({
    ReadMore
}: ActionProps) {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }} className="flex flex-col gap-4 justify-center">
      {ReadMore && (
        <Button asChild variant="link" className="text-primary text-sm">
          <Link href="/about">
            Read More<ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      )}
      <Button asChild className="px-6 py-3 mx-auto">
        <Link href="/#contact">Hire Me</Link>
      </Button>
      <Button asChild variant="outline" className="px-6 py-3 mx-auto">
        <Link href="/resume.pdf" target="_blank">
          Download CV
        </Link>
      </Button>
    </motion.div>
  );
}
