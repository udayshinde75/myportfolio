import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { User } from "@/models/user";

/**
 * GET /api/home/profile
 * Fetches the portfolio owner's public profile information
 * 
 * @returns {Promise<NextResponse>} JSON response containing public profile data or error
 */
export async function GET() {
    try {
        // Connect to MongoDB database
        await connectToDB();

        // Fetch portfolio owner's data excluding password
        const user = await User.findById(process.env.NEXT_PUBLIC_OWNER).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found"}, {status: 404});
        }
        return NextResponse.json(user);
    }
    catch (error) {
        // Log error and return unauthorized status
        console.log("api/home/profile/route.ts: " + error);
        return NextResponse.json({ error: "Unauthorized"}, {status: 401});
    }
}