import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * GET /api/auth/profileinfo
 * Fetches authenticated user's profile information using JWT token
 * 
 * @returns {Promise<NextResponse>} JSON response containing user profile data or error
 */
export const GET = async () => {
    try {
        // Connect to MongoDB database
        await connectToDB();

        // Get authentication token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify JWT token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== "string" && "userId" in decoded) {
            // Fetch user data excluding password
            const user = await User.findById(decoded.userId).select("-password");
        
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            // Return user profile data
            return NextResponse.json({ user }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Invalid token" }, { status: 403 });
        }
    } catch (error) {
        // Log error and return unauthorized status
        console.log(error);
        return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
};
