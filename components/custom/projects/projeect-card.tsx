import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type ProjectCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  techStack: string[];
};

export default function ProjectCard({
  imageUrl,
  title,
  description,
  techStack,
}: ProjectCardProps) {
  return (
    <Card className="w-full max-w-sm rounded-2xl transition-transform hover:scale-105 shadow-xl border-stone-600 mt-10 backdrop-blur-3xl bg-opacity-40 ">
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={250}
        className="rounded-t-2xl object-cover"
      />
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <Badge variant="secondary" className="text-sm" key={index}>
            {tech}
            </Badge>
          ))}
          
        </div>
      </CardContent>
    </Card>
  );
}
