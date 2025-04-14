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
    request: NextRequest,
    context: { params: { educationId: string } }
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { params } = context;
        const { educationId } = params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const education = await Education.findOne({
                _id: educationId,
                user: decoded.userId,
            });

            if (!education) {
                return NextResponse.json({ error: "Degree not found" }, { status: 404 });
            }

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
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (err) {
        console.log("GET /api/dashboard/education/[educationId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    context: { params: { educationId: string } }
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { params } = context;
        const { educationId } = params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const body = await request.json();
            const parse = EducationSchema.safeParse(body);

            if (!parse.success) {
                return NextResponse.json({ error: parse.error }, { status: 400 });
            }

            const updatedEducation = await Education.findOneAndUpdate(
                {
                    _id: educationId,
                    user: decoded.userId,
                },
                parse.data,
                { new: true }
            );

            if (!updatedEducation) {
                return NextResponse.json({ error: "Education not found or not authorized to edit." }, { status: 404 });
            }

            return NextResponse.json({ success: "Education Details updated successfully" });
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (err) {
        console.log("PATCH /api/dashboard/Education/[educationId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: { educationId: string } }
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { params } = context;
        const { educationId } = params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const education = await Education.findOne({
                _id: educationId,
                user: decoded.userId,
            });
        
            if (!education) {
                return NextResponse.json({ error: "Education not found or not authorized to delete." }, { status: 404 });
            }

            await education.deleteOne();

            return NextResponse.json({ success: "Education deleted successfully." }, { status: 200 });
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (err) {
        console.log("DELETE /api/dashboard/education/[educationId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}