import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { User } from "@/models/user";

/**
 * GET /api/getUserPortfolio
 * Retrieves a user's portfolio information based on userID
 * If no userID is provided, returns the portfolio owner's information
 * 
 * @param {Request} req - The incoming request object containing userID as a query parameter
 * @returns {Promise<NextResponse>} JSON response containing user's name or error
 */
export const GET = async (req: Request) => {
    try {
        console.log("Entered In getuserportfolio:");
        // Connect to MongoDB database
        await connectToDB();
        
        // Extract userID from URL query parameters
        const url = new URL(req.url);
        const userID = url.searchParams.get("userID") || ""; // Default to empty string if not provided

        console.log("UserID:" + userID);

        // If no userID provided, return portfolio owner's information
        if (userID === "") {
            const user = await User.findById(process.env.NEXT_PUBLIC_OWNER);
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            console.log("UserID:" + process.env.NEXT_PUBLIC_OWNER);
            return NextResponse.json({
                name: user.name,
            });
        }

        // Find user by provided userID
        const user = await User.findById(userID);

        console.log(user);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return user's name
        return NextResponse.json({
            name: user.name,
        });
        
    } catch (error) {
        // Log error and return 500 status
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
