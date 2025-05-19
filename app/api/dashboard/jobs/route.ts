import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Job } from "@/models/job";

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * GET /api/dashboard/jobs
 * Retrieves all job entries for the authenticated user
 * 
 * @returns {Promise<NextResponse>} JSON response containing user's job entries or error
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
            // Fetch all job entries for the user, sorted by creation date
            const jobs = await Job.find({ user: decoded.userId }).sort({ createdAt: -1 });
            return NextResponse.json(jobs);
        }

        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (error) {
        // Log error and return 500 status
        console.log("api/dashboard/jobs :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

/**
 * POST /api/dashboard/jobs
 * Creates a new job entry for the authenticated user
 * 
 * @param {Request} req - The incoming request containing job data
 * @returns {Promise<NextResponse>} JSON response indicating job creation success or failure
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
            // Get job data from request body
            const body = await req.json();

            // Validate required fields
            if (!body.title || !body.companyName || !body.description || !body.location) {
                return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
                );
            }

            // Create and save new job entry
            const newJob = new Job({
                ...body,
                user: decoded.userId
            })
            await newJob.save();

            // Return success response with created job entry
            return NextResponse.json(
                { success: "Job created successfully", job: newJob },
                { status: 201 }
            );
        }

        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        // Log error and return 500 status
        console.error("api/dashboard/jobs method: post:", err);
        return NextResponse.json(
        { error: "Failed to create job" },
        { status: 500 }
        );
    }
}