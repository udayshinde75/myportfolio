/**
 * Service Component
 * 
 * A component that displays service information with expandable sections
 * Features:
 * - Accordion-based content organization
 * - Responsive typography
 * - Separate sections for recruiters and clients
 * - Experience display
 * - Vertical line separator
 * - Custom styling for accordion triggers
 * 
 * @param {Object} props - Component props
 * @param {string} [props.title] - The title of the service
 * @param {string} [props.Experience] - Description of experience in the service
 * @param {string} [props.InfoForRecruiters] - Information specific to recruiters
 * @param {string} [props.InfoForClients] - Information specific to clients
 * @returns {JSX.Element} The service information layout
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VerticalLine } from "../navbar/line";
import { Metadata } from "next";

// SEO metadata for services
export const metadata: Metadata = {
    title: "Services - Uday Shinde Portfolio",
    description: "Professional services offered in software development, including web development",
    keywords: ["services", "software development", "web development", "data analysis", "recruitment", "client services","backend development","full stack development","Next.js","React","Node.js","MongoDB","Tailwind CSS","TypeScript","GitHub"],
    openGraph: {
        title: "Services - Uday Shinde Portfolio",
        description: "Professional services offered in software development",
        type: "website"
    }
};

export interface ServiceProps {
    title?: string;
    Experience?: string;
    InfoForRecruiters?: string;
    InfoForClients?: string;
}

export default function Service({
  title,
  Experience,
  InfoForRecruiters,
  InfoForClients,
}: ServiceProps) {
  return (
    <>
      {/* Service Title */}
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>

      {/* Experience Section */}
      <h3 className="md:text-xl text-md font-semibold mb-4">💻Experience</h3>
      <div className="md:text-lg text-sm text-muted-foreground">
        {Experience}
      </div>

      {/* Accordion Sections */}
      <Accordion
        type="single"
        collapsible
        defaultValue="recruiter"
        className="w-full"
      >
        {/* Recruiter Information Section */}
        <AccordionItem value="recruiter">
          <AccordionTrigger className="no-underline md:text-lg text-sm hover:no-underline focus:no-underline">
            👩‍💼 Are you a Recruiter?
          </AccordionTrigger>
          <AccordionContent>
            <div className="md:text-lg text-sm text-muted-foreground">
              {InfoForRecruiters}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Client Information Section */}
        <AccordionItem value="client">
          <AccordionTrigger className="no-underline md:text-lg text-sm hover:no-underline focus:no-underline">
            👩‍💻 Are you a Client?
          </AccordionTrigger>
          <AccordionContent>
            <div className="md:text-lg text-sm text-muted-foreground">
              {InfoForClients}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Visual Separator */}
        <VerticalLine />
      </Accordion>
    </>
  );
}
