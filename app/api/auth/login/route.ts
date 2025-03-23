import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const POST = async (req: Request) => {
    try {
        // Connect to MongoDB
        await connectToDB();
        //console.log(JWT_SECRET);
        // Parse request body
        const body = await req.json();
        const validation = LoginSchema.safeParse(body);

        // Validate request body
        if (!validation.success) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        const { email, password } = body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        // Set HTTP-only cookie correctly
        const response = new NextResponse(
            JSON.stringify({ success: "Logged in successfully", userID: user._id }),
            { status: 200 }
        );
        response.headers.set("Content-Type", "application/json");
        response.cookies.set("token", token, {
            httpOnly: true,    // Prevents client-side access
            secure: process.env.NODE_ENV === "production", // Works only on HTTPS in production
            sameSite: "strict", // Prevents CSRF attacks
            maxAge: 7 * 24 * 60 * 60, // 7 days expiration
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
