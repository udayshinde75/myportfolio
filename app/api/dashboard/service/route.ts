import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import Jwt  from "jsonwebtoken";
import { Service } from "@/models/service";

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * GET /api/dashboard/service
 * Retrieves all services for the authenticated user
 * 
 * @returns {Promise<NextResponse>} JSON response containing user's services or error
 */
export async function GET() {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Get and verify authentication token
        const Token = await getToken();
        if (!Token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        // Verify JWT token and extract user ID
        const decoded = Jwt.verify(Token, JWT_SECRET);
        if (typeof decoded !== "string" && "userId" in decoded) {
            // Fetch all services for the user, sorted by creation date
            const service = await Service.find({user: decoded.userId}).sort({createdAt: -1});
            return NextResponse.json(service);
        }

        return NextResponse.json({error: "Unauthorized"}, {status:401})
    } catch (err) {
        // Log error and return 500 status
        console.log("api/dashboard/service GET API : "+ err);
        return NextResponse.json({error: "Something went wrong"}, {status : 500})
    }
}

/**
 * POST /api/dashboard/service
 * Creates a new service for the authenticated user
 * 
 * @param {Request} req - The incoming request containing service data
 * @returns {Promise<NextResponse>} JSON response indicating service creation success or failure
 */
export async function POST (req: Request) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Get and verify authentication token
        const Token = await getToken();
        if (!Token) {
            return NextResponse.json({error : "Unauthorized"}, {status : 401});
        }

        // Verify JWT token and extract user ID
        const decoded = Jwt.verify(Token, JWT_SECRET);
        if (typeof decoded !== "string" && "userId" in decoded) {
            // Get service data from request body
            const body = await req.json();

            // Create and save new service
            const newService = new Service({
                ...body,
                user: decoded.userId
            });
            await newService.save();

            // Return success response
            return NextResponse.json({success: "Service Created Successfully"}, {status: 201});
        }
    } catch (err) {
        // Log error and return 500 status
        console.error("api/dashboard/service method: post:", err);
        return NextResponse.json(
        { error: "Failed to create service" },
        { status: 500 }
        );
    }
}
