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
const ServiceSchema = z.object({
    title: z.string().min(3),
    InfoForRecruiters: z.string().min(100),
    InfoForClients: z.string().min(100),
    Experience: z.string().min(100),
})

interface IService {
    _id: string,
    title: string,
    InfoForRecruiters: string,
    InfoForClients: string,
    Experience: string,
}


type ServiceFormValues = z.infer<typeof ServiceSchema>;

export const ServiceForm = ({ initialData }: { initialData?: IService }) => {
    const router = useRouter();
    const isEditMode = !!initialData?._id;
    console.log("isEditMode:"+isEditMode)

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(ServiceSchema),
        defaultValues: {
          title: initialData?.title || "",
          InfoForRecruiters: initialData?.InfoForRecruiters || "",
          InfoForClients: initialData?.InfoForClients || "",
          Experience: initialData?.Experience || "",
        },
    });

    const onSubmit = (values: ServiceFormValues) => {
        setError("");
        setSuccess("");
    
        const data = {
          ...values,
        };
    
        startTransition(() => {
          fetch(
            isEditMode
              ? `/api/dashboard/service/${initialData?._id}`
              : "/api/dashboard/service",
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
                toast.error(isEditMode ? "Failed to update service!" : "Failed to add service!")
              };
              if (result.success){
                setSuccess(result.success);
                toast.success(isEditMode ? "Service updated successfully!" : "Service Added Successfully!")
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
            headerLabel={isEditMode ? "Edit Service" : "Add New Service"}
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
                      <FormLabel>Service Title</FormLabel>
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
                <FormField
                  control={form.control}
                  name="InfoForRecruiters"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Info For Recruiters</FormLabel>
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
                  name="InfoForClients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Information for Clients</FormLabel>
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
                  name="Experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
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
    
                <FormError message={error} />
                <FormSuccess message={success} />
    
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isEditMode ? "Update Service Details" : "Add Service Details"}
                </Button>
              </form>
            </Form>
          </CardWrapper>
        </motion.div>
    );
}
