import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Project } from "@/models/project";

/**
 * Zod schema for validating project data
 * Defines the structure and validation rules for project entries
 */
const projectSchema = z.object({
    projectName: z.string().min(1),
    projectDescription: z.string().min(100),
    skills: z.array(z.string()).optional(),
    githubLink: z.string().optional(),
    liveDemo: z.string().optional(),
    readmeFile: z.string().url(),
    projectPictureUrl: z.string().url(),
});

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * GET /api/dashboard/projects/[projectId]
 * Retrieves a specific project by ID
 * 
 * @param {Request} req - The incoming request object
 * @param {Object} params - Contains the projectId from the URL
 * @returns {Promise<NextResponse>} JSON response containing project data or error
 */
export async function GET(
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }
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
        const {projectId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Find project by ID and user ID
            const project = await Project.findOne({
                _id: projectId,
                user: decoded.userId,
            });

            if (!project) {
                return NextResponse.json({ error: "Project not found" }, { status: 404 });
            }

            // Return project data with specific fields
            return NextResponse.json({
                _id: project._id,
                projectName: project.projectName,
                projectDescription: project.projectDescription,
                skills: project.skills,
                githubLink: project.githubLink,
                liveDemo: project.liveDemo,
                readmeFile: project.readmeFile,
                projectPictureUrl: project.projectPictureUrl,
            });
        }
    } catch (err) {
        // Log error and return 500 status
        console.log("GET /api/dashboard/projects/[projectId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/dashboard/projects/[projectId]
 * Updates a specific project by ID
 * 
 * @param {Request} req - The incoming request containing updated project data
 * @param {Object} params - Contains the projectId from the URL
 * @returns {Promise<NextResponse>} JSON response indicating update success or failure
 */
export async function PATCH (
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }
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
        const {projectId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Get and validate updated project data
            const body = await req.json();
            const parse = projectSchema.safeParse(body);

            // Update project if found and authorized
            const updatedProject = await Project.findOneAndUpdate(
                {
                  _id: projectId,
                  user: decoded.userId,
                },
                { ...parse.data },
                { new: true }
            );

            if (!updatedProject) {
                return NextResponse.json({ error: "Project not found or not authorized to edit." }, { status: 404 });
            }

            return NextResponse.json({ success: "Project updated successfully" });
        }
        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        // Log error and return 500 status
        console.log("PATCH /api/dashboard/projects/[projectId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/dashboard/projects/[projectId]
 * Deletes a specific project by ID
 * 
 * @param {Request} req - The incoming request object
 * @param {Object} params - Contains the projectId from the URL
 * @returns {Promise<NextResponse>} JSON response indicating deletion success or failure
 */
export async function DELETE (
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }
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
        const {projectId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Find project by ID and user ID
            const project = await Project.findOne({
                _id: projectId,
                user: decoded.userId,
            });
        
            if (!project) {
                return NextResponse.json({ error: "Project not found or not authorized to delete." }, { status: 404 });
            }

            // Delete the project
            await project.deleteOne();

            return NextResponse.json({ success: "Project deleted successfully." }, { status: 200 });
        }
        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        // Log error and return 500 status
        console.log("DELETE /api/dashboard/projects/[projectId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}