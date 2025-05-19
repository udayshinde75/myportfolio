import { User } from "@/models/user";
import { connectToDB } from "@/utils/database";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * PUT /api/dashboard/updateProfile
 * Updates authenticated user's profile information
 * 
 * @param {Request} req - The incoming request containing updated profile data
 * @returns {Promise<NextResponse>} JSON response indicating update success or failure
 */
export async function PUT(req: Request) {
    try {
        // Connect to MongoDB database
        await connectToDB();

        // Get authentication token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        // Verify JWT token and extract user ID
        const decoded = Jwt.verify(token, JWT_SECRET);

        if (typeof decoded !== "string" && "userId" in decoded) {
            const userId = decoded.userId;
            
            // Get updated profile data from request body
            const body = await req.json();
            
            // Get current user data
            const user = await User.findById(userId).select("-password");
            
            // Update user profile with new data, keeping existing values if not provided
            const updated = await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        name: body.name || user.name,
                        email: body.email || user.email,
                        profilePicture: body.profilePicture || user.profilePicture || "",
                        resumeLink: body.resumeLink || user.resumeLink || "",
                        bio: body.bio || user.bio || "",
                        linkedIn: body.linkedIn || user.linkedIn || "",
                        instagram: body.instagram || user.instagram || "",
                        github: body.github || user.github || "",
                        twitter: body.twitter || user.twitter || "",
                    }
                },
                {new: true} // Return updated document
            )

            if (!updated) {
                return NextResponse.json({error: "User not found"}, {status: 404});
            }
            
            // Return success response
            return NextResponse.json({success: "Profile updated successfully"}, {status: 200});
        }
    } catch (error) {
        // Log error and return unauthorized status
        console.log("api/dashboard/updateProfile/route.ts: " + error);
        return NextResponse.json({ error: "Unauthorized"}, {status: 401});
    }
}