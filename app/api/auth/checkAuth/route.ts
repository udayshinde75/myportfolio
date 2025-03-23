import { NextResponse } from "next/server";
import {verifyToken} from "@/utils/auth" // Create a utility function for verifying JWT

export const GET = async (req: Request) => {
    try {
        const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0]; // Extract token

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        const user = verifyToken(token); // Verify JWT

        if (!user) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        return NextResponse.json({ authenticated: true, user });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 500 });
    }
};
