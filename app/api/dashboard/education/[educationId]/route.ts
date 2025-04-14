import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Education } from "@/models/education";
import { z } from "zod";

const EducationSchema = z.object({
    title: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    universityName: z.string().min(1),
    universityIcon: z.string().url(),
    universityLink: z.string().url().optional().or(z.literal("")),
    location: z.string().min(1),
    description: z.string().min(100),
    skills: z.array(z.string()).optional(),
    proof: z.string().url().optional(),
    score: z.string().min(1),
    scoreType: z.enum(["CGPA", "Percentage", "Grade"]),
});

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(
    _req: NextRequest,
    context: { params: { educationId: string } }
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { educationId } = context.params;

        console.log("education ID:",educationId)

        if (typeof decoded !== "string" && "userId" in decoded) {
            const education = await Education.findOne({
                _id: educationId,
                user: decoded.userId,
            });

            if (!education) {
                return NextResponse.json({ error: "Degree not found" }, { status: 404 });
            }

            //console.log(job)

            return NextResponse.json({
                _id: education._id,
                title: education.title,
                startDate: education.startDate,
                endDate: education.endDate,
                universityName: education.universityName,
                universityIcon: education.universityIcon,
                universityLink: education.universityLink,
                location: education.location,
                description: education.description,
                skills: education.skills,
                proof: education.proof,
                score: education.score,
                scoreType: education.scoreType,
            });
            
        }
    } catch (err) {
        console.log("GET /api/dashboard/education/[educationId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH (
    req: Request,
    { params } : { params: { educationId: string } }
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { educationId } = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const body = await req.json();
            const parse = EducationSchema.safeParse(body);

            console.log("Body before parse: ", body)

            console.log("Parsed Data: ", {...parse.data})


            const updatedEducation = await Education.findOneAndUpdate(
                {
                  _id: educationId,
                  user: decoded.userId,
                },
                { ...parse.data },
                { new: true }
            );

            console.log(updatedEducation)

            if (!updatedEducation) {
                return NextResponse.json({ error: "Job not found or not authorized to edit." }, { status: 404 });
            }

            return NextResponse.json({ success: "Education Details updated successfully" });
        }
        return NextResponse.json({error:"Unauthorized"}, {status: 401});
        
    } catch (err) {
        console.log("PATCH /api/dashboard/Education/[educationId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE (
    req : Request,
    { params }: { params: { educationId : string}}
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const {educationId} = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const education = await Education.findOne({
                _id: educationId,
                user: decoded.userId,
            });
        
            if (!education) {
            return NextResponse.json({ error: "Job not found or not authorized to delete." }, { status: 404 });
            }

            await education.deleteOne();

            return NextResponse.json({ success: "Job deleted successfully." }, { status: 200 });
        }
        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (err) {
        console.log("DELETE /api/dashboard/education/[educationId] error", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}