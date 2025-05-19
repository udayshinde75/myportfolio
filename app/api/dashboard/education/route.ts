import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Education } from "@/models/education";

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * GET /api/dashboard/education
 * Retrieves all education entries for the authenticated user
 * 
 * @returns {Promise<NextResponse>} JSON response containing user's education entries or error
 */
export async function GET() {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Get and verify authentication token
        const Token = await getToken();
        if (!Token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        // Verify JWT token and extract user ID
        const decoded = jwt.verify(Token, JWT_SECRET);
        if (typeof decoded !== "string" && "userId" in decoded) {
            // Fetch all education entries for the user, sorted by creation date
            const education = await Education.find({ user: decoded.userId }).sort({ createdAt: -1 });
            return NextResponse.json(education);
        }

        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (error) {
        // Log error and return 500 status
        console.log("api/dashboard/education :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

/**
 * POST /api/dashboard/education
 * Creates a new education entry for the authenticated user
 * 
 * @param {Request} req - The incoming request containing education data
 * @returns {Promise<NextResponse>} JSON response indicating education creation success or failure
 */
export async function POST (req: Request) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Get and verify authentication token
        const Token = await getToken();
        if (!Token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        // Verify JWT token and extract user ID
        const decoded = jwt.verify(Token, JWT_SECRET);
        if (typeof decoded !== "string" && "userId" in decoded) {
            // Get education data from request body
            const body = await req.json();

            // Create and save new education entry
            const newEducation = new Education({
                ...body,
                user: decoded.userId
            })
            await newEducation.save();

            // Return success response with created education entry
            return NextResponse.json(
                { success: "Education created successfully", education: newEducation },
                { status: 201 }
            );
        }
    } catch (err) {
        // Log error and return 500 status
        console.error("api/dashboard/education method: post:", err);
        return NextResponse.json(
        { error: "Failed to create education" },
        { status: 500 }
        );
    }
}