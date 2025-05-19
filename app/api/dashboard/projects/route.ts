import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Project } from "@/models/project";

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * GET /api/dashboard/projects
 * Retrieves all projects for the authenticated user
 * 
 * @returns {Promise<NextResponse>} JSON response containing user's projects or error
 */
export async function GET(_req: Request) {
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
            // Fetch all projects for the user, sorted by creation date
            const projects = await Project.find({ user: decoded.userId }).sort({ createdAt: -1 });
            return NextResponse.json(projects);
        }

        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (error) {
        // Log error and return 500 status
        console.log("api/dashboard/projects :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

/**
 * POST /api/dashboard/projects
 * Creates a new project for the authenticated user
 * 
 * @param {Request} req - The incoming request containing project data
 * @returns {Promise<NextResponse>} JSON response indicating project creation success or failure
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
            // Get project data from request body
            const body = await req.json();

            // Validate required fields
            if (!body.projectName || !body.projectDescription || !body.readmeFile || !body.projectPictureUrl) {
                return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
                );
            }

            // Create and save new project
            const newProject = new Project({
                ...body,
                user: decoded.userId
            })
            await newProject.save();

            // Return success response with created project
            return NextResponse.json(
                { success: "Project added successfully", project: newProject },
                { status: 201 }
            );
        }

        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        // Log error and return 500 status
        console.error("api/dashboard/projects method: post:", err);
        return NextResponse.json(
        { error: "Failed to add project!" },
        { status: 500 }
        );
    }
}