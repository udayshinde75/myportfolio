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

/**
 * Schema for project form validation
 * Defines validation rules for all project-related fields including:
 * - Project name (1-25 characters)
 * - Project description (85-100 characters)
 * - Skills (comma-separated list)
 * - Optional GitHub and live demo links
 * - Required readme file and project picture URLs
 */
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

/**
 * Interface defining the structure of a project entry
 * Used for both creating new projects and editing existing ones
 */
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

/**
 * ProjectForm Component
 * 
 * Form component for adding or editing project entries
 * Features:
 * - Form validation using Zod schema
 * - Support for both create and edit modes
 * - Real-time field validation
 * - Toast notifications for success/error states
 * - Animated form transitions
 * - Skills management with comma-separated input
 * 
 * @param {Object} props - Component props
 * @param {ProjectType} props.initialData - Optional initial data for edit mode
 * @returns {JSX.Element} The project form
 */
export const ProjectForm = ({ initialData }: { initialData?: ProjectType }) => {
  const router = useRouter();
  const isEditMode = !!initialData?._id;
  console.log("isEditMode:"+isEditMode)

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  // Initialize form with validation and default values
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

  /**
   * Form submission handler
   * Processes form data and sends to appropriate API endpoint
   * Handles both create and update operations
   * Converts comma-separated skills string to array before submission
   */
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
            {/* Project title field */}
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

            {/* Project description field */}
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

            {/* GitHub and live demo links in a 2-column grid */}
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

            {/* Readme file and project screenshot in a 2-column grid */}
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

            {/* Skills field - comma-separated list */}
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

            {/* Error and success messages */}
            <FormError message={error} />
            <FormSuccess message={success} />

            {/* Form submission button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isEditMode ? "Update Project Details" : "Add Project Details"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </motion.div>
  );
}
