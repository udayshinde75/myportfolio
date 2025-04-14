import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Job } from "@/models/job";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(req: Request) {
    try {
        await connectToDB();
        const Token = await getToken();

        if (!Token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(Token, JWT_SECRET);

        if (typeof decoded !== "string" && "userId" in decoded) {
            const jobs = await Job.find({ user: decoded.userId }).sort({ createdAt: -1 });
            //console.log(jobs)
            return NextResponse.json(jobs);
        }

        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (error) {
        console.log("api/dashboard/jobs :" + error)
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

            if (!body.title || !body.companyName || !body.description || !body.location) {
                return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
                );
            }

            const newJob = new Job({
                ...body,
                user: decoded.userId
            })

            await newJob.save();

            return NextResponse.json(
                { success: "Job created successfully", job: newJob },
                { status: 201 }
            );
        }

        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        console.error("api/dashboard/jobs method: post:", err);
        return NextResponse.json(
        { error: "Failed to create job" },
        { status: 500 }
        );
    }
    
}