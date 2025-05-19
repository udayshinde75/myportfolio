/**
 * Register Form Component
 * 
 * A client-side form component for user registration
 * Features:
 * - Form validation using Zod schema
 * - Error and success message handling
 * - Animated transitions using Framer Motion
 * - Responsive layout with card wrapper
 * - Secure password and passkey handling
 * 
 * @returns {JSX.Element} The registration form layout
 */
"use client";
import { useTransition, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/custom/auth/form-error";
import { FormSuccess } from "@/components/custom/auth/form-success";
import { motion } from "framer-motion";

/**
 * Handles the registration API request
 * Sends user data to the server and processes the response
 * 
 * @param {Object} data - Registration data
 * @param {string} data.name - User's full name
 * @param {string} data.email - User's email address
 * @param {string} data.password - User's password
 * @param {string} data.passkey - Registration passkey for security
 * @returns {Promise<Object>} The server response with success/error message
 */
const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
    passkey: string;
}) => {
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return { error: result.error };
        }

        return { success: result.success };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong, please try again later." };
    }
};

export const RegisterForm = () => {
    // State management for form submission and feedback
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Initialize form with validation schema
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passkey: "",
        },
    });

    /**
     * Handles form submission
     * Validates and submits registration data
     * Manages success/error states
     * 
     * @param {Object} data - Form data from validation
     */
    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            registerUser(data).then((response) => {
                setError(response.error ?? "");
                setSuccess(response.success ?? "");
            });
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <CardWrapper
                headerLabel="Create an account"
                icon="Already have an account?"
                backButtonHref="/auth/signin"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-4">
                            {/* Name input field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Your name" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Email input field */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder="abc@email.com" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Password input field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" placeholder="******" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Passkey input field */}
                            <FormField
                                control={form.control}
                                name="passkey"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Passkey</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" placeholder="abcdabcdabcdabcd" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Error and success messages */}
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        {/* Submit button */}
                        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                            Create account
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </motion.div>
    );
};

export default RegisterForm;
