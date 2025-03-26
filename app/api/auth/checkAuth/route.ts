import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.error("No token provided");
      return NextResponse.json(
        { authenticated: false, error: "No token provided" },
        { status: 401 }
      );
    }

    let user;
    try {
      user = verifyToken(token);
      console.log("Verify Token User: ", user);
    } catch (error) {
      console.error("Token verification error:", error);
      return NextResponse.json(
        { authenticated: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.json({ authenticated: true, user }, { status: 200 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Server error" },
      { status: 500 }
    );
  }
};
