import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Education } from "@/models/education";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET() {
    try {
        await connectToDB();
        const Token = await getToken();

        if (!Token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = jwt.verify(Token, JWT_SECRET);

        if (typeof decoded !== "string" && "userId" in decoded) {
            const education = await Education.find({ user: decoded.userId }).sort({ createdAt: -1 });
            //console.log(education)
            return NextResponse.json(education);
        }

        return NextResponse.json({error:"Unauthorized"}, {status: 401});
    } catch (error) {
        console.log("api/dashboard/education :" + error)
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

            const newEducation = new Education({
                ...body,
                user: decoded.userId
            })

            await newEducation.save();

            return NextResponse.json(
                { success: "Education created successfully", education: newEducation },
                { status: 201 }
            );
        }
    } catch (err) {
        console.error("api/dashboard/education method: post:", err);
        return NextResponse.json(
        { error: "Failed to create education" },
        { status: 500 }
        );
    }
    
}