import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Job } from "@/models/job";
import { z } from "zod";

const jobSchema = z.object({
    title: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    companyName: z.string().min(1),
    companyLink: z.string().optional(),
    description: z.string().optional(),
    skills: z.array(z.string()).optional(),
});

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(
    req: Request,
    { params } : {params : {jobId: string}}
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const {jobId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const job = await Job.findOne({
                _id: jobId,
                user: decoded.userId,
            });

            if (!job) {
                return NextResponse.json({ error: "Job not found" }, { status: 404 });
            }

            console.log(job)

            return NextResponse.json({
                _id: job._id,
                title: job.title,
                startDate: job.startDate,
                endDate: job.endDate,
                companyName: job.companyName,
                companyLink: job.companyLink,
                description: job.description,
                skills: job.skills,
            });
            
        }
    } catch (err) {
        console.log("GET /api/dashboard/jobs/[jobId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH (
    req: Request,
    { params } : { params: { jobId:string } }
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const {jobId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const body = await req.json();
            const parse = jobSchema.safeParse(body);

            const updatedJob = await Job.findOneAndUpdate(
                {
                  _id: params.jobId,
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
        console.log("PATCH /api/dashboard/jobs/[jobId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: { jobId : string}}
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const {jobId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const job = await Job.findOne({
                _id: jobId,
                user: decoded.userId,
            });
        
            if (!job) {
            return NextResponse.json({ error: "Job not found or not authorized to delete." }, { status: 404 });
            }

            await job.deleteOne();

            return NextResponse.json({ success: "Job deleted successfully." }, { status: 200 });
        }
        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        console.log("DELETE /api/dashboard/jobs/[jobId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}