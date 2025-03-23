import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secure-secret-key";

export const GET = async (req: Request) => {
    try {
        await connectToDB();

        const cookieStore = await cookies(); // ✅ Await the cookies()
        const token = cookieStore.get("token")?.value; // ✅ Extract token
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== "string" && "userId" in decoded) {
            const user = await User.findById(decoded.userId).select("-password"); // Exclude password
        
        
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            return NextResponse.json({ user }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Invalid token" }, { status: 403 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
};
