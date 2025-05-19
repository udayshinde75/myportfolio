import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Job } from "@/models/job";
import { z } from "zod";

/**
 * Zod schema for validating job data
 * Defines the structure and validation rules for job entries
 */
const jobSchema = z.object({
    title: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    companyName: z.string().min(1),
    companyLink: z.string().optional(),
    location: z.string().min(1),
    description: z.string().optional(),
    skills: z.array(z.string()).optional(),
});

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * GET /api/dashboard/jobs/[jobId]
 * Retrieves a specific job entry by ID
 * 
 * @param {Request} req - The incoming request object
 * @param {Object} params - Contains the jobId from the URL
 * @returns {Promise<NextResponse>} JSON response containing job data or error
 */
export async function GET(
    req: Request,
    { params }: { params: Promise<{ jobId: string }> }
) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Get and verify authentication token
        const token = await getToken();
        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        // Verify JWT token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const {jobId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Find job entry by ID and user ID
            const job = await Job.findOne({
                _id: jobId,
                user: decoded.userId,
            });

            if (!job) {
                return NextResponse.json({ error: "Job not found" }, { status: 404 });
            }

            // Return job data with specific fields
            return NextResponse.json({
                _id: job._id,
                title: job.title,
                startDate: job.startDate,
                endDate: job.endDate,
                companyName: job.companyName,
                companyLink: job.companyLink,
                location: job.location,
                description: job.description,
                skills: job.skills,
            });
        }
    } catch (err) {
        // Log error and return 500 status
        console.log("GET /api/dashboard/jobs/[jobId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/dashboard/jobs/[jobId]
 * Updates a specific job entry by ID
 * 
 * @param {Request} req - The incoming request containing updated job data
 * @param {Object} params - Contains the jobId from the URL
 * @returns {Promise<NextResponse>} JSON response indicating update success or failure
 */
export async function PATCH (
    req: Request,
    { params }: { params: Promise<{ jobId: string }> }
) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Get and verify authentication token
        const token = await getToken();
        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        // Verify JWT token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const {jobId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Get and validate updated job data
            const body = await req.json();
            const parse = jobSchema.safeParse(body);

            // Update job entry if found and authorized
            const updatedJob = await Job.findOneAndUpdate(
                {
                  _id: jobId,
                  user: decoded.userId,
                },
                { ...parse.data },
                { new: true }
            );

            if (!updatedJob) {
                return NextResponse.json({ error: "Job not found or not authorized to edit." }, { status: 404 });
            }

            return NextResponse.json({ success: "Job updated successfully" });
        }
        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        // Log error and return 500 status
        console.log("PATCH /api/dashboard/jobs/[jobId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/dashboard/jobs/[jobId]
 * Deletes a specific job entry by ID
 * 
 * @param {Request} req - The incoming request object
 * @param {Object} params - Contains the jobId from the URL
 * @returns {Promise<NextResponse>} JSON response indicating deletion success or failure
 */
export async function DELETE (
    req: Request,
    { params }: { params: Promise<{ jobId: string }> }
) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Get and verify authentication token
        const token = await getToken();
        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        // Verify JWT token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const {jobId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Find job entry by ID and user ID
            const job = await Job.findOne({
                _id: jobId,
                user: decoded.userId,
            });
        
            if (!job) {
                return NextResponse.json({ error: "Job not found or not authorized to delete." }, { status: 404 });
            }

            // Delete the job entry
            await job.deleteOne();

            return NextResponse.json({ success: "Job deleted successfully." }, { status: 200 });
        }
        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        // Log error and return 500 status
        console.log("DELETE /api/dashboard/jobs/[jobId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}