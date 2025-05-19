import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import jwt from "jsonwebtoken";

// JWT secret key for token generation
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

/**
 * POST /api/auth/login
 * Handles user authentication and login
 * 
 * @param {Request} req - The incoming request containing email and password
 * @returns {Promise<NextResponse>} JSON response with authentication token and user data
 */
export const POST = async (req: Request) => {
    try {
        // Connect to MongoDB database
        await connectToDB();

        // Parse and validate request body
        const body = await req.json();
        const validation = LoginSchema.safeParse(body);

        // Return 400 if validation fails
        if (!validation.success) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        const { email, password } = body;

        // Check if user exists in database
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Verify password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        // Generate JWT token with user data
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        // Create response with success message and user ID
        const response = new NextResponse(
            JSON.stringify({ success: "Logged in successfully", userID: user._id }),
            { status: 200 }
        );
        
        // Set response headers and cookies
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
        // Log error and return 500 status
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
