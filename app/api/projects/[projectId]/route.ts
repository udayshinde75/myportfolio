import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Project } from "@/models/project";

/**
 * GET /api/projects/[projectId]
 * Fetches a specific project by its ID
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
        
        // Extract projectId from URL parameters
        const {projectId} = await params;

        // Find the specific project by ID
        const project = await Project.findOne({
            _id: projectId,
        });

        // Return 404 if project not found
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Return specific project fields as JSON response
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
    } catch (err) {
        // Log error and return 500 status with error message
        console.log("GET /api/projects/[projectId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}