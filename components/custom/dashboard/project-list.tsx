import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Edit, Delete } from "lucide-react";
import { Description } from "./description";
import { motion } from "framer-motion";
import SkillTags from "../about/SkillTags";
import { IProject } from "@/models/project";

export default function ProjectList() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/dashboard/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          toast.error("Unexpected response format");
          console.error("Projects API response was not an array:", data);
        }
      })
      .catch(() => toast.error("Failed to fetch Projects"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: string) => {
    startTransition(() => {
      fetch(`/api/dashboard/projects/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Project deleted");
            setProjects((prev) => prev.filter((project) => project._id.toString() !== id));
          } else {
            toast.error(data.error || "Failed to delete project");
          }
        })
        .catch(() => toast.error("Failed to delete project"))
        
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 m-5"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Projects</h2>
        <Button onClick={() => router.push("/dashboard/projects/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Projects
        </Button>
      </div>

      {projects.length === 0
        ? toast.dismiss("You have not added any Projects yet")
        : projects.map((project) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={project._id.toString()}
            >
              <Card
                className="shadow-xl md:border border-none mt-10  border-gray-500 rounded-3xl px-3   backdrop-blur-xl bg-opacity-80 "
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{project.projectName}</h3>
                    </div>
                  </div>
                  <Description description={project.projectDescription} />
                  <SkillTags skills={project.skills || []} />
                  <div className="space-x-2 flex-center mt-2">
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/dashboard/projects/new?id=${project._id}`)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(project._id.toString())}
                      disabled={isPending}
                    >
                      <Delete />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
    </motion.div>
  );
}
