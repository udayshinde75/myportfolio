import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Incorrect email entered!"
  }),
  password: z.string().min(6, {
    message: "Please enter your password!"
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  passkey: z.string().min(16, "Passkey must be at least 16 characters"),
});
