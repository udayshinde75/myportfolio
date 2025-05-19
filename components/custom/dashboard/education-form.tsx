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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select"
  import { CircleDot, PercentCircle, BadgeCheck } from "lucide-react"

/**
 * Schema for education form validation
 * Defines validation rules for all education-related fields
 */
export const EducationSchema = z.object({
    title: z.string().min(1, "Education Title is required"),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().min(1, "End Date is required"),
    universityName: z.string().min(1, "University Name is required"),
    universityIcon: z.string().url("A valid URL for university icon is required"),
    universityLink: z.string().url("University Link must be a valid URL").optional().or(z.literal("")),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(100, "Description should be at least 100 characters"),
    skills: z.string().optional(),
    proof: z.string().url("Proof must be a valid URL").optional(),
    score: z.string().min(1, "Score is required"),
    scoreType: z.enum(["CGPA", "Percentage", "Grade"], {
      required_error: "Score type is required",
      invalid_type_error: "Score type must be one of CGPA, Percentage, or Grade",
    }),
});

/**
 * Interface defining the structure of an education entry
 * Used for both creating new education entries and editing existing ones
 */
interface IEducation {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    universityName: string;
    universityIcon: string;
    universityLink?: string;
    location:string;
    description: string;
    skills?: string[];
    proof?:string;
    score:string;
    scoreType:string;
}

type EducationFormValues = z.infer<typeof EducationSchema>;

/**
 * EducationForm Component
 * 
 * Form component for adding or editing education entries
 * Features:
 * - Form validation using Zod schema
 * - Support for both create and edit modes
 * - Real-time field validation
 * - Toast notifications for success/error states
 * - Animated form transitions
 * - Score type selection with custom icons
 * 
 * @param {Object} props - Component props
 * @param {IEducation} props.initialData - Optional initial data for edit mode
 * @returns {JSX.Element} The education form
 */
export const EducationForm = ({ initialData }: { initialData?: IEducation }) => {
    const router = useRouter();
    const isEditMode = !!initialData?._id;
    console.log("isEditMode:"+isEditMode)

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();

    // Initialize form with validation and default values
    const form = useForm<EducationFormValues>({
        resolver: zodResolver(EducationSchema),
        defaultValues: {
          title: initialData?.title || "",
          startDate: initialData?.startDate || "",
          endDate: initialData?.endDate || "",
          universityName: initialData?.universityName || "",
          universityIcon: initialData?.universityIcon || "",
          universityLink: initialData?.universityLink || "",
          location: initialData?.location || "",
          description: initialData?.description || "",
          skills: (initialData?.skills && initialData.skills.length > 0) 
            ? initialData.skills.join(", ") 
            : "",
          proof: initialData?.proof || "",
          score: initialData?.score || "",
          scoreType: ["CGPA", "Percentage", "Grade"].includes(initialData?.scoreType as string)
            ? (initialData?.scoreType as "CGPA" | "Percentage" | "Grade")
            : "CGPA",
        },
    });

    /**
     * Form submission handler
     * Processes form data and sends to appropriate API endpoint
     * Handles both create and update operations
     */
    const onSubmit = (values: EducationFormValues) => {
        setError("");
        setSuccess("");
    
        const data = {
          ...values,
          skills: values.skills?.split(",").map((s) => s.trim()),
        };
    
        startTransition(() => {
          fetch(
            isEditMode
              ? `/api/dashboard/education/${initialData?._id}`
              : "/api/dashboard/education",
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
                toast.error(isEditMode ? "Failed to update education!" : "Failed to add education!")
              };
              if (result.success){
                setSuccess(result.success);
                toast.success(isEditMode ? "Education updated successfully!" : "Education Added Successfully!")
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
            headerLabel={isEditMode ? "Edit Education" : "Add New Education"}
            icon={<Home/>}
            backButtonHref="/dashboard"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Education title field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Bachelor of Computer Application"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                {/* Date range fields */}
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

                {/* University information fields */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="universityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. IIT"
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

                {/* University links and icon fields */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="universityLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University Link</FormLabel>
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
                    name="universityIcon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University Icon URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/icon.png"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your education experience..."
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
                    name="proof"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>proof Link</FormLabel>
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

                {/* Score information fields */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="score"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Score</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 8.5"
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
                    name="scoreType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Score Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select score type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CGPA">
                              <div className="flex items-center gap-2">
                                <CircleDot className="w-4 h-4" />
                                CGPA
                              </div>
                            </SelectItem>
                            <SelectItem value="Percentage">
                              <div className="flex items-center gap-2">
                                <PercentCircle className="w-4 h-4" />
                                Percentage
                              </div>
                            </SelectItem>
                            <SelectItem value="Grade">
                              <div className="flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4" />
                                Grade
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
                  {isEditMode ? "Update Education Details" : "Add Education Details"}
                </Button>
              </form>
            </Form>
          </CardWrapper>
        </motion.div>
    );
};
