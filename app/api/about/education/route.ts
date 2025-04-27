import { Education } from "@/models/education";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(_req:Request) {
    try {
        await connectToDB();
        const education = await Education.find({ user: process.env.NEXT_PUBLIC_OWNER }).sort({ createdAt: -1 });
        //console.log(education)
        return NextResponse.json(education);
    } catch (error) {
        console.log("api/about/education :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}