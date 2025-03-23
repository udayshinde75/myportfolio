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
    const [isPending, startTransition] = useTransition();  
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

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
                            window.location.href = `/${response.userID}`; // Redirect after login
                        }, 1500);
                    }
                })
                .catch(() => setError("Something went wrong. Please try again."));
        });
    };

    return (
        <CardWrapper
            headerLabel="Log in to manage your portfolio"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/signup"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-4">
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
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
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
    );
}

export default LoginForm;
