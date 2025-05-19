import { Service } from "@/models/service";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

/**
 * GET /api/service
 * Fetches all services offered by the portfolio owner
 * 
 * @returns {Promise<NextResponse>} JSON response containing services data or error
 */
export async function GET(_req: Request) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Fetch all services for the portfolio owner
        const services = await Service.find({ user: process.env.NEXT_PUBLIC_OWNER });
        
        // Return services data as JSON response
        return NextResponse.json(services);
    } catch (error) {
        // Log error and return 500 status with error message
        console.log("api/service :" + error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}