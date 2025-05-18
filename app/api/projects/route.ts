import { Project } from "@/models/project";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
    try {
        await connectToDB();
        const projects = await Project.find({ user: process.env.NEXT_PUBLIC_OWNER });
        //console.log(projects)
        return NextResponse.json(projects);
    } catch (error) {
        console.log("api/projects :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}