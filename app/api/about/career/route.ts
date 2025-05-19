import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Job } from "@/models/job";

/**
 * GET /api/about/career
 * Fetches all job/career records for the portfolio owner
 * 
 * @returns {Promise<NextResponse>} JSON response containing career data or error
 */
export async function GET(_req: Request) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Fetch job records for the portfolio owner, sorted by creation date (newest first)
        const jobs = await Job.find({ user: process.env.NEXT_PUBLIC_OWNER }).sort({ createdAt: -1 });
        
        // Return job data as JSON response
        return NextResponse.json(jobs);
    } catch (error) {
        // Log error and return 500 status with error message
        console.log("api/about/career :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}