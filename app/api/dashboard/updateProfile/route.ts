import { User } from "@/models/user";
import { connectToDB } from "@/utils/database";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function PUT(req: Request) {
    try {
        await connectToDB();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const decoded = Jwt.verify(token, JWT_SECRET);

        if (typeof decoded !== "string" && "userId" in decoded) {
            const userId = decoded.userId;
            const body = await req.json();
            const user = await User.findById(userId).select("-password");
            const updated = await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        name: body.name || user.name,
                        email: body.email || user.email,
                        profilePicture: body.profilePicture || user.profilePicture || "",
                        resumeLink: body.resumeLink || user.resumeLink || "",
                        bio: body.bio || user.bio || "",
                        linkedIn: body.linkedIn || user.linkedIn || "",
                        instagram: body.instagram || user.instagram || "",
                        github: body.github || user.github || "",
                        twitter: body.twitter || user.twitter || "",
                    }
                },
                {new: true}
            )
            console.log(updated)
            if (!updated) {
                return NextResponse.json({error: "User not found"}, {status: 404});
            }
            return NextResponse.json({success: "Profile updated successfully"}, {status: 200});
        }
    } catch (error) {
        console.log("api/dashboard/updateProfile/route.ts: " + error);
        return NextResponse.json({ error: "Unauthorized"}, {status: 401});
    }
}