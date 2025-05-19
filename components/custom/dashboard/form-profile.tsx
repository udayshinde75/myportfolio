"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { CardWrapper } from "@/components/custom/auth/card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSuccess } from "../auth/form-success";
import { Button } from "@/components/ui/button";
import { FormError } from "../auth/form-error";
import { useRouter } from "next/navigation";

/**
 * Schema for profile update form validation
 * Defines validation rules for all profile fields
 */
const UpdateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    profilePicture: z.string().optional(),
    resumeLink: z.string().optional(),
    bio: z.string().optional(),
    linkedIn: z.string().optional(),
    instagram: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
})

type UpdateFormData = z.infer<typeof UpdateSchema>;

/**
 * UpdateProfileForm Component
 * 
 * Form component for updating user profile information
 * Features:
 * - Form validation using Zod schema
 * - Real-time field validation
 * - Error and success message handling
 * - Automatic data fetching on component mount
 * - Animated form transitions
 * 
 * @returns {JSX.Element} The profile update form
 */
export const UpdateProfileForm = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter(); 

    // Initialize form with validation and default values
    const form = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateSchema),
        defaultValues: {
            name: "",
            email: "",
            profilePicture: "",
            resumeLink: "",
            bio: "",
            linkedIn: "",
            instagram: "",
            github: "",
            twitter: "",
        }
    });

    /**
     * Effect hook to fetch user profile data
     * Populates form fields with existing user data
     */
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/dashboard/profile");
                const data = await res.json();
                if (res.ok) {
                    form.reset({
                        name: data.name,
                        email: data.email,
                        profilePicture: data.profilePicture || "",
                        resumeLink: data.resumeLink || "",
                        bio: data.bio || "",
                        linkedIn: data.linkedIn || "",
                        instagram: data.instagram || "",
                        github: data.github || "",
                        twitter: data.twitter || "",
                    })
                } else {
                    setError((data.error) || "Could not fetch user data!");
                }
            } catch(err) {
                console.log("Dashboard Profile Form : "+ err)
                setError("Failed to fetch data!");
            }
        };
        fetchUser();
    }, [form]);

    /**
     * Form submission handler
     * Sends updated profile data to the server
     * Handles success and error states
     */
    const onSubmit = (data: UpdateFormData) => {
        setError("");
        setSuccess("");
        console.log(data)
        startTransition(() => {
            fetch("/api/dashboard/updateProfile",{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .then((result) => {
                setError(result.error ?? "");
                setSuccess(result.success ?? "");

                if (result.success) {
                    router.push("/auth/signin");
                }
            })
            .catch(() => setError("Something Went Wrong"));
        })
    }

    return(
        <motion.div
            initial={{opacity:0, y:50}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.5}}
            className="m-5"
        >
            <CardWrapper
                headerLabel="Update Profile"
                icon=""
                backButtonHref=""
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name field */}
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Email field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Profile picture URL field */}
                        <FormField
                            control={form.control}
                            name="profilePicture"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Picture URL</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Resume link field */}
                        <FormField
                            control={form.control}
                            name="resumeLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resume Link</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Social media links - first row */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="linkedIn"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Linked In</FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        type="url"
                                        disabled={isPending}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="instagram"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instagram</FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        type="url"
                                        disabled={isPending}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        {/* Social media links - second row */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="github"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Github</FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        type="url"
                                        disabled={isPending}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="twitter"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Twitter</FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        type="url"
                                        disabled={isPending}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        {/* Bio field */}
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>bio</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={error} />
                        <FormSuccess message={success} />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            Update Profile
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </motion.div>
    )
}