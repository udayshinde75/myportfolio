import { Badge } from "@/components/ui/badge";

interface SkillTagsProps {
    skills: string[];
}

export default function SkillTags({skills}:SkillTagsProps) {
    return (
        <div className="flex flex-row flex-wrap container-width gap-2 mt-4">
            {skills.map((skill, index)=>(
                <Badge key={index} variant={"secondary"} className="text-sm">
                    {skill}
                </Badge>
            ))}
        </div>
    )
}