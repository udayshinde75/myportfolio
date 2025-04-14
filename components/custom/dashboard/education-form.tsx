"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Home } from "lucide-react";

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
    SelectScrollUpButton,
    SelectScrollDownButton,
  } from "@/components/ui/select"
  import { CircleDot, PercentCircle, BadgeCheck } from "lucide-react"
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

const allowedScoreTypes = ["CGPA", "Percentage", "Grade"] as const;

type EducationFormValues = z.infer<typeof EducationSchema>;

export const EducationForm = ({ initialData }: { initialData?: IEducation }) => {
    const router = useRouter();
    const isEditMode = !!initialData?._id;
    console.log("isEditMode:"+isEditMode)

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();

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
          scoreType: allowedScoreTypes.includes(initialData?.scoreType as any)
          ? (initialData?.scoreType as "CGPA" | "Percentage" | "Grade")
          : "CGPA",
        },
    });

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
                            <FormLabel>University Icon</FormLabel>
                            <FormControl>
                            <Input
                                placeholder="google drive file link"
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
                <div className="flex flex-between md:flex-row flex-col gap-4">
                    <FormField
                    control={form.control}
                    name="scoreType"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel>Score Type</FormLabel>
                        <FormControl>
                        <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                        >
                        <SelectTrigger className="w-full border-gray-300 shadow-sm hover:border-gray-400 focus:ring-1 focus:ring-blue-500 transition-all duration-200 rounded-xl">
                            <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent
                        position="popper"
                        avoidCollisions={false}
                        className="z-[999] bg-white border border-gray-200 shadow-xl rounded-xl text-gray-900"
                        >
                        <SelectScrollUpButton className="flex justify-center items-center p-2">
                            <ChevronUp className="h-4 w-4" />
                        </SelectScrollUpButton>

                        {/* Items */}
                        <SelectItem value="CGPA" className="cursor-pointer hover:bg-blue-50 rounded-md px-3 py-2">
                            <div className="flex items-center gap-2">
                            <CircleDot className="h-4 w-4 text-indigo-600" />
                            CGPA
                            </div>
                        </SelectItem>

                        <SelectItem value="Percentage" className="cursor-pointer hover:bg-blue-50 rounded-md px-3 py-2">
                            <div className="flex items-center gap-2">
                            <PercentCircle className="h-4 w-4 text-green-600" />
                            Percentage
                            </div>
                        </SelectItem>

                        <SelectItem value="Grade" className="cursor-pointer hover:bg-blue-50 rounded-md px-3 py-2">
                            <div className="flex items-center gap-2">
                            <BadgeCheck className="h-4 w-4 text-yellow-600" />
                            Grade
                            </div>
                        </SelectItem>

                        <SelectScrollDownButton className="flex justify-center items-center p-2">
                            <ChevronDown className="h-4 w-4" />
                        </SelectScrollDownButton>
                        </SelectContent>

                        </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="score"
                        render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Score</FormLabel>
                            <FormControl>
                            <Input
                                placeholder="8.12"
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
                  {isEditMode ? "Update Education Details" : "Add Education Details"}
                </Button>
              </form>
            </Form>
          </CardWrapper>
        </motion.div>
    );
}
