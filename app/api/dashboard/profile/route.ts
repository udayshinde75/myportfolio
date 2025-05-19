import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { getToken } from "@/utils/getToken";

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * GET /api/dashboard/profile
 * Fetches authenticated user's profile information
 * 
 * @returns {Promise<NextResponse>} JSON response containing user profile data or error
 */
export async function GET(_req: Request) {
    try {
        // Connect to MongoDB database
        await connectToDB();

        // Get authentication token
        const token = await getToken();
        if (!token) {
            return NextResponse.json({ error: "Unauthorized"}, {status: 401});
        }

        // Verify JWT token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== "string" && "userId" in decoded) {
            // Fetch user data excluding password
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return NextResponse.json({ error: "User not found"}, {status: 404});
            }
            return NextResponse.json(user);
        }
        return NextResponse.json({ error: "Unauthorized"}, {status: 401});
    }
    catch (error) {
        // Log error and return unauthorized status
        console.log("api/dashboard/profile/route.ts: " + error);
        return NextResponse.json({ error: "Unauthorized"}, {status: 401});
    }
}