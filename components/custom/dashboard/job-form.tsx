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

const JobSchema = z.object({
  title: z.string().min(1, "Job Title is required!"),
  startDate: z.string().min(1, "Start Date is required!"),
  endDate: z.string().min(1, "End Date is required!"),
  companyName: z.string().min(1, "Company Name is required!"),
  companyLink: z.string().optional(),
  location: z.string().min(1, "Job location is required!"),
  description: z.string().min(100, "Describle your Job in 100 words."),
  skills: z.string().min(1, "Skills are required (comma-separated:MongoDB,React.js)"),
});

type JobFormValues = z.infer<typeof JobSchema>;

interface JobType {
  _id?: string;
  title: string;
  startDate: string;
  endDate: string;
  companyName: string;
  companyLink?: string;
  location: string;
  description: string;
  skills: string[];
}

export const JobForm = ({ initialData }: { initialData?: JobType }) => {
  const router = useRouter();
  const isEditMode = !!initialData?._id;
  console.log("isEditMode:"+isEditMode)

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: initialData?.title || "",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
      companyName: initialData?.companyName || "",
      companyLink: initialData?.companyLink || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      skills: (initialData?.skills && initialData.skills.length > 0) 
        ? initialData.skills.join(", ") 
        : "",
    },
  });

  const onSubmit = (values: JobFormValues) => {
    setError("");
    setSuccess("");

    const data = {
      ...values,
      skills: values.skills.split(",").map((s) => s.trim()),
    };

    startTransition(() => {
      fetch(
        isEditMode
          ? `/api/dashboard/jobs/${initialData?._id}`
          : "/api/dashboard/jobs",
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
            toast.error(isEditMode ? "Failed to update job!" : "Failed to add job!")
          };
          if (result.success){
            setSuccess(result.success);
            toast.success(isEditMode ? "Job updated successfully!" : "Job Added Successfully!")
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
      transition={{ duration: 1 }}
      className="w-full"
    >
      <CardWrapper
        headerLabel={isEditMode ? "Edit Job" : "Add New Job"}
        icon={<Home/>}
        backButtonHref="/dashboard"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Software Engineer"
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
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Jan 2023"
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
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Dec 2023 or Present"
                        {...field}
                        disabled={isPending}
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
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Google, Inc."
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="pune, India"
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
              name="companyLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you do?"
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
              {isEditMode ? "Update Job" : "Add Job"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </motion.div>
  );
};
