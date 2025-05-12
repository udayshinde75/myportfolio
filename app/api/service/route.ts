import { Service } from "@/models/service";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
    try {
        await connectToDB();
        const services = await Service.find({ user: process.env.NEXT_PUBLIC_OWNER });
        console.log(services)
        return NextResponse.json(services);
    } catch (error) {
        console.log("api/about/service :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}