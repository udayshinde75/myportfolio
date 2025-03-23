import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secure-secret-key";

export async function middleware(req: Request) {
    const cookieStore = await cookies(); // ✅ Await the cookies()
    const token = cookieStore.get("token")?.value; // ✅ Extract token

    console.log(token)

    if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    try {
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        return NextResponse.next();
    } catch (error) {
        console.log("middleware"+error)
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
}

// Apply middleware to protect specific routes
export const config = {
    matcher: ["/dashboard"],
};
