import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Job } from "@/models/job";

export async function GET() {
    try {
        await connectToDB();
        const jobs = await Job.find({ user: process.env.NEXT_PUBLIC_OWNER }).sort({ createdAt: -1 });
        console.log(jobs)
        return NextResponse.json(jobs);
    } catch (error) {
        console.log("api/dashboard/jobs :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}