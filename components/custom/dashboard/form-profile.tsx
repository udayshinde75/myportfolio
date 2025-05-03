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

const UpdateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    profilePicture: z.string().optional(),
    resumeLink: z.string().optional(),
    bio: z.string().optional()
})

type UpdateFormData = z.infer<typeof UpdateSchema>;

export const UpdateProfileForm = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter(); 

    const form = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateSchema),
        defaultValues: {
            name: "",
            email: "",
            profilePicture: "",
            resumeLink: "",
            bio: ""
        }
    });

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

    const onSubmit = (data: UpdateFormData) => {
        setError("");
        setSuccess("");

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
                            size="lg"
                            disabled={isPending}
                        >
                            Update
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </motion.div>
    )
}