import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Project } from "@/models/project";

const projectSchema = z.object({
    projectName: z.string().min(1),
    projectDescription: z.string().min(100),
    skills: z.array(z.string()).optional(),
    githubLink: z.string().optional(),
    liveDemo: z.string().optional(),
    readmeFile: z.string().url(),
    projectPictureUrl: z.string().url(),
});

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const {projectId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const project = await Project.findOne({
                _id: projectId,
                user: decoded.userId,
            });

            if (!project) {
                return NextResponse.json({ error: "Project not found" }, { status: 404 });
            }

            //console.log(job)

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
        console.log("GET /api/dashboard/projects/[projectId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const {projectId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const body = await req.json();
            const parse = projectSchema.safeParse(body);

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
        console.log("PATCH /api/dashboard/projects/[projectId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const {projectId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const project = await Project.findOne({
                _id: projectId,
                user: decoded.userId,
            });
        
            if (!project) {
            return NextResponse.json({ error: "Project not found or not authorized to delete." }, { status: 404 });
            }

            await project.deleteOne();

            return NextResponse.json({ success: "Project deleted successfully." }, { status: 200 });
        }
        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        console.log("DELETE /api/dashboard/projects/[projectId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}