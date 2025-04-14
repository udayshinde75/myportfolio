"use client"

import { IEducation } from "@/models/education";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Edit, Delete } from "lucide-react";
import { Description } from "./description";
import { motion } from "framer-motion";
import SkillTags from "../about/SkillTags";

export default function EducationList() {
    const [education, setEducation] = useState<IEducation[]>([]);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/dashboard/education")
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data)) {
                setEducation(data);
            } else {
                toast.error("Unexpected response format!");
                console.log("Education Api response was not an array:", data);
            }
        })
        .catch(() => toast.error("Failed to fetch education data"))
        .finally(() => setLoading(false));
    },[])

    const handleDelete = (id: string) => {
        startTransition(() => {
            fetch(`/api/dashboard/education/${id}`, {
                method: "DELETE",
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Education deleted");
                    setEducation((prev) => prev.filter((education) => education._id.toString() !== id));
                } else {
                    toast.error(data.error || "Failed to delete job");
                }
            })
            .catch(() => toast.error("Failed to delete education!"))
        })
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center gap-x-5">
            <h2 className="text-xl font-semibold">Education Data</h2>
            <Button onClick={() => router.push("/dashboard/education")}>
              <Plus className="w-4 h-4 mr-2" /> Add Education
            </Button>
          </div>
    
          {education.length === 0
            ? toast.dismiss("You have not added education yet!")
            : education.map((data) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Card
                    key={data._id.toString()}
                    className="shadow-xl md:border border-none mt-10  border-gray-500 rounded-3xl px-3   backdrop-blur-xl bg-opacity-80 "
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold">{data.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {data.universityLink ? (
                              <a
                                href={data.universityLink}
                                target="_blank"
                                className="underline"
                              >
                                {data.universityName}
                              </a>
                            ) : (
                              data.universityName
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {data.location}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {data.startDate} – {data.endDate}
                          </p>
                        </div>
                      </div>
                      <Description description={data.description} />
                      <SkillTags skills={data.skills || []} />
                      <div className="space-x-2 flex-center mt-2">
                        <Button
                          variant="outline"
                          onClick={() => router.push(`/dashboard/education?id=${data._id}`)}
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(data._id.toString())}
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