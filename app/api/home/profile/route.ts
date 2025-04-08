import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { User } from "@/models/user";

export async function GET() {
    try {
        await connectToDB();
        const user = await User.findById(process.env.NEXT_PUBLIC_OWNER).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found"}, {status: 404});
        }
        return NextResponse.json(user);
    }
    catch (error) {
        console.log("api/home/profile/route.ts: " + error);
        return NextResponse.json({ error: "Unauthorized"}, {status: 401});
    }
}