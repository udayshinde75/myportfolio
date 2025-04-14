import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { getToken } from "@/utils/getToken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(_req: Request) {
    try {
        await connectToDB();
        //const cookieStore = await cookies();
        //const token = cookieStore.get("token")?.value;
        const token = await getToken();
        if (!token) {
            return NextResponse.json({ error: "Unauthorized"}, {status: 401});
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== "string" && "userId" in decoded) {
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return NextResponse.json({ error: "User not found"}, {status: 404});
            }
            return NextResponse.json(user);
        }
        return NextResponse.json({ error: "Unauthorized"}, {status: 401});
    }
    catch (error) {
        console.log("api/dashboard/profile/route.ts: " + error);
        return NextResponse.json({ error: "Unauthorized"}, {status: 401});
    }
}