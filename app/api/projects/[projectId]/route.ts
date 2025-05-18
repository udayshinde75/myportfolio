import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Project } from "@/models/project";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        await connectToDB();
        const {projectId} = await params;

        const project = await Project.findOne({
            _id: projectId,
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        //console.log(project)

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
        console.log("GET /api/projects/[projectId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}