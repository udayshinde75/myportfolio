"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Home } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/custom/auth/card-wrapper";
import { FormError } from "../auth/form-error";
import { FormSuccess } from "../auth/form-success";
import { useRouter } from "next/navigation";

const ProjectSchema = z.object({
  projectName: z.string().min(1, "Project Title is required!").max(25),
  projectDescription: z.string().min(85, "project Description is required!").max(100),
  skills: z.string().min(1, "Skills are required (comma-separated:MongoDB,React.js)"),
  githubLink: z.string().optional(),
  liveDemo: z.string().optional(),
  readmeFile: z.string().url().min(1,"Readme file is required"),
  projectPictureUrl: z.string().url().min(1,"Picture is required"),
});

type ProjectFormValues = z.infer<typeof ProjectSchema>;

interface ProjectType {
    _id: string;
    projectName: string;
    projectDescription: string;
    skills?: string[];
    githubLink?: string;
    liveDemo?: string;
    readmeFile: string;
    projectPictureUrl: string;
}

export const ProjectForm = ({ initialData }: { initialData?: ProjectType }) => {
  const router = useRouter();
  const isEditMode = !!initialData?._id;
  console.log("isEditMode:"+isEditMode)

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      projectName: initialData?.projectName || "",
      projectDescription: initialData?.projectDescription || "",
      skills: (initialData?.skills && initialData.skills.length > 0) 
        ? initialData.skills.join(", ") 
        : "",
      githubLink: initialData?.githubLink || "",
      liveDemo: initialData?.liveDemo || "",
      readmeFile: initialData?.readmeFile || "",
      projectPictureUrl: initialData?.projectPictureUrl || "",
    },
  });

  const onSubmit = (values: ProjectFormValues) => {
    setError("");
    setSuccess("");

    const data = {
      ...values,
      skills: values.skills.split(",").map((s) => s.trim()),
    };

    startTransition(() => {
      fetch(
            isEditMode
            ? `/api/dashboard/projects/${initialData?._id}`
            : "/api/dashboard/projects",
            {
            method: isEditMode ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            }
        )
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            setError(result.error);
            toast.error(isEditMode ? "Failed to update Project!" : "Failed to add Project!")
          };
          if (result.success){
            setSuccess(result.success);
            toast.success(isEditMode ? "Project updated successfully!" : "Project Added Successfully!")
            router.push("/auth/signin");
          } 
        })
        .catch(() => {
            toast.error("Something went wrong!")
            setError("Something went wrong!")
        });
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <CardWrapper
        headerLabel={isEditMode ? "Edit Project" : "Add New Project"}
        icon={<Home/>}
        backButtonHref="/dashboard"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ecommerce website"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="githubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Project Github Link"
                        {...field}
                        disabled={isPending}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="liveDemo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Project Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Live project link"
                        {...field}
                        disabled={isPending}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="readmeFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Readme File</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Readme.md Github file link"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectPictureUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Screenshot</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Screenshot link"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. React, Node.js, MongoDB"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isEditMode ? "Update Project" : "Add Project"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </motion.div>
  );
};
