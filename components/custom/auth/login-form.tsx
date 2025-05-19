/**
 * Login Form Component
 * 
 * A client-side form component for user authentication
 * Features:
 * - Form validation using Zod schema
 * - Error and success message handling
 * - Animated transitions using Framer Motion
 * - Responsive layout with card wrapper
 * - Automatic redirection after successful login
 * 
 * @returns {JSX.Element} The login form layout
 */
"use client";
import { useTransition, useState } from "react";
import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/custom/auth/form-error";
import { FormSuccess } from "@/components/custom/auth/form-success";
import { motion } from "framer-motion";
import { LucideHome } from "lucide-react";

/**
 * Handles the login API request
 * Sends credentials to the server and processes the response
 * 
 * @param {Object} data - Login credentials
 * @param {string} data.email - User's email address
 * @param {string} data.password - User's password
 * @returns {Promise<Object>} The server response
 */
export const login = async (data: { email: string; password: string}) => {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Login request failed:", error);
        return { error: "Network error. Please try again later." };
    }
};

export const LoginForm = () => {
    // State management for form submission and feedback
    const [isPending, startTransition] = useTransition();  
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Initialize form with validation schema
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    /**
     * Handles form submission
     * Validates and submits login credentials
     * Manages success/error states and redirection
     * 
     * @param {Object} data - Form data from validation
     */
    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(data)
                .then((response) => {
                    if (response.error) {
                        setError(response.error);
                    } else {
                        setSuccess("Login successful! Redirecting to your dashboard...");
                        setTimeout(() => {
                            window.location.href = `/dashboard`; // Redirect after login
                        }, 1500);
                    }
                })
                .catch(() => setError("Something went wrong. Please try again."));
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <CardWrapper
                headerLabel="Log in to manage your portfolio"
                icon={<LucideHome />} 
                backButtonHref="/"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-4">
                            {/* Email input field */}
                            <FormField 
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder="abc@email.com" disabled={isPending}/>
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.email?.message}</FormMessage>
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
                                            <Input {...field} type="password" placeholder="******" disabled={isPending}/>
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                    </FormItem>                            
                                )}
                            />
                        </div>
                        {/* Error and success messages */}
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={isPending}
                        >
                            Login
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </motion.div>
    );
}

export default LoginForm;
