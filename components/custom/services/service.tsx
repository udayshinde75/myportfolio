import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Line, VerticalLine } from "../navbar/line";

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
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <h3 className="md:text-xl text-md font-semibold mb-4">💻Experience</h3>
      <div className="md:text-lg text-sm text-muted-foreground">
        {Experience}
      </div>
      <Accordion
        type="single"
        collapsible
        defaultValue="recruiter"
        className="w-full"
      >
        {/* Recruiter Section */}
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

        {/* Client Section */}
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
        <VerticalLine/>
      </Accordion>
    </>
  );
}
