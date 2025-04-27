import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface SkillTagsProps {
  skills: string[];
}

export default function SkillTags({ skills }: SkillTagsProps) {
  if (skills.length === 1 && skills[0].trim() == "") {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap container-width gap-2 mt-4">
      {skills.map((skill) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.05 }}
        >
          <Badge variant="secondary" className="text-sm">
            {skill}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}
