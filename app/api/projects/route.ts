import { Project } from "@/models/project";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

/**
 * GET /api/projects
 * Fetches all projects for the portfolio owner
 * 
 * @returns {Promise<NextResponse>} JSON response containing project data or error
 */
export async function GET(_req: Request) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Fetch all projects for the portfolio owner
        const projects = await Project.find({ user: process.env.NEXT_PUBLIC_OWNER });
        
        // Return projects data as JSON response
        return NextResponse.json(projects);
    } catch (error) {
        // Log error and return 500 status with error message
        console.log("api/projects :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}