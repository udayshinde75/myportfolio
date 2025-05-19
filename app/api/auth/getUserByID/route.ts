import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/utils/database";
import { User } from "@/models/user";

/**
 * GET /api/auth/getUserByID
 * Fetches user information by ID or returns default user if no ID provided
 * 
 * @param {Request} req - The incoming request containing optional userID query parameter
 * @returns {Promise<NextResponse>} JSON response containing user data or error
 */
export const GET = async (req: Request) => {
  try {
    // Connect to MongoDB database
    await connectToDB();
    
    // Parse URL to get userID from query parameters
    const url = new URL(req.url);
    const userID = url.searchParams.get("userID");

    // If no userID provided, return default user (portfolio owner)
    if (!userID) {
      const objectId = new mongoose.Types.ObjectId(process.env.NEXT_PUBLIC_OWNER);
      const defaultUser = await User.findById(objectId);
      
      if (!defaultUser) {
        return NextResponse.json({ error: "Default user not found" }, { status: 404 });
      }

      // Return sanitized user data
      return NextResponse.json({
        name: defaultUser.name,
        email: defaultUser.email,
        id: defaultUser._id,
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return NextResponse.json({ error: "Invalid User ID format" }, { status: 400 });
    }

    // Convert string ID to MongoDB ObjectId
    const objectId = new mongoose.Types.ObjectId(userID);

    // Find user by ID
    const user = await User.findById(objectId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return sanitized user data
    return NextResponse.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    // Log error and return 500 status
    console.error("Error in getuserbyid:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
