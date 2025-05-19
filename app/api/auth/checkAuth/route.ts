import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

/**
 * GET /api/auth/checkAuth
 * Verifies user authentication status by checking JWT token
 * 
 * @returns {Promise<NextResponse>} JSON response with authentication status and user data if authenticated
 */
export const GET = async (_req: Request) => {
  try {
    // Get token from cookies
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    // Return unauthenticated if no token found
    if (!token) {
      console.error("No token provided");
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }

    // Verify token and extract user data
    let user;
    try {
      user = verifyToken(token);
      console.log("Verify Token User: ", user);
    } catch (error) {
      // Return unauthenticated if token verification fails
      console.error("Token verification error:", error);
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }

    // Return authenticated status with user data
    return NextResponse.json({ authenticated: true, user }, { status: 200 });
  } catch (error) {
    // Log error and return unauthenticated status
    console.error("Auth check error:", error);
    return NextResponse.json(
        { authenticated: false },
        { status: 200 }
    );
  }
};
