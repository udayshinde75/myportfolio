import { NextResponse } from "next/server";

/**
 * POST /api/auth/signout
 * Handles user signout by clearing the authentication token cookie
 * 
 * @returns {Promise<NextResponse>} JSON response indicating successful signout
 */
export async function POST() {
  // Create success response
  const response = NextResponse.json({ success: true });

  // Clear authentication token by setting an expired cookie
  response.cookies.set("token", "", {
    httpOnly: true,      // Prevent JavaScript access to cookie
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "strict",  // Prevent CSRF attacks
    expires: new Date(0), // Set expiration to past date to invalidate cookie
    path: "/",           // Match the original cookie path
  });

  return response;
}
