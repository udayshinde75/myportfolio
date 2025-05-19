import { Education } from "@/models/education";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

/**
 * GET /api/about/education
 * Fetches all education records for the portfolio owner
 * 
 * @returns {Promise<NextResponse>} JSON response containing education data or error
 */
export async function GET(_req:Request) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Fetch education records for the portfolio owner, sorted by creation date (newest first)
        const education = await Education.find({ user: process.env.NEXT_PUBLIC_OWNER }).sort({ createdAt: -1 });
        
        // Return education data as JSON response
        return NextResponse.json(education);
    } catch (error) {
        // Log error and return 500 status with error message
        console.log("api/about/education :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}