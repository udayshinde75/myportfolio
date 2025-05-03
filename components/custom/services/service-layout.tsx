"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function ServiceLayout() {
  return (
    <motion.div
      className="flex-col pb-5 container-width"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-semibold mb-4">Fullstack Developer</h2>

      <Accordion type="single" collapsible defaultValue="recruiter" className="w-full">
        {/* Recruiter Section */}
        <AccordionItem value="recruiter">
          <AccordionTrigger className="no-underline md:text-lg text-sm hover:no-underline focus:no-underline">
            👩‍💼 Are you a Recruiter?
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="md:text-lg text-sm text-muted-foreground"
            >
              I build reliable fullstack apps using C#, .NET Core, React, and Node.js—clean code,
              scalable systems, and well-documented APIs to support development teams efficiently.
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Client Section */}
        <AccordionItem value="client">
          <AccordionTrigger className="no-underline md:text-lg text-sm hover:no-underline focus:no-underline">
            👩‍💻 Are you a Client?
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="md:text-lg text-sm text-muted-foreground"
            >
              I create easy-to-use, clean, and smooth websites or apps. Whether it’s a portfolio,
              a booking system, or something custom, we’ll make it functional and good-looking!
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
