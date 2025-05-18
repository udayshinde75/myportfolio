import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Project } from "@/models/project";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(_req: Request) {
    try {
        await connectToDB();
        const Token = await getToken();

        if (!Token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(Token, JWT_SECRET);

        if (typeof decoded !== "string" && "userId" in decoded) {
            const projects = await Project.find({ user: decoded.userId }).sort({ createdAt: -1 });
            //console.log(projects)
            return NextResponse.json(projects);
        }

        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (error) {
        console.log("api/dashboard/projects :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function POST (req: Request) {
    try {
        await connectToDB();
        const Token = await getToken();

        if (!Token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(Token, JWT_SECRET);

        if (typeof decoded !== "string" && "userId" in decoded) {
            const body = await req.json();

            if (!body.projectName || !body.projectDescription || !body.readmeFile || !body.projectPictureUrl) {
                return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
                );
            }

            const newProject = new Project({
                ...body,
                user: decoded.userId
            })

            await newProject.save();

            return NextResponse.json(
                { success: "Project added successfully", project: newProject },
                { status: 201 }
            );
        }

        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        console.error("api/dashboard/projects method: post:", err);
        return NextResponse.json(
        { error: "Failed to add project!" },
        { status: 500 }
        );
    }
    
}