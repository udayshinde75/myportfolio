import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Job } from "@/models/job";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(req: Request) {
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