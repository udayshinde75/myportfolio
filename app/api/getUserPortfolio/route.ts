import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { User } from "@/models/user";

export const GET = async (req: Request) => {
    try {
        console.log("Entered In getuserportfolio:");
        await connectToDB();
        const url = new URL(req.url);
        const userID = url.searchParams.get("userID") || ""; // Default to your ID

        console.log("UserID:" +userID);

        if (userID === "") {
            const user = await User.findById(process.env.NEXT_PUBLIC_OWNER);
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            console.log("UserID:" + process.env.NEXT_PUBLIC_OWNER );
            return NextResponse.json({
                name: user.name,
            });
        }

        const user = await User.findById(userID);

        console.log(user)
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            name: user.name,

        });
        
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
