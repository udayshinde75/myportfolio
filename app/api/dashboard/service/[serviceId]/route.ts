import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Service } from "@/models/service";
import { z } from "zod";

/**
 * Zod schema for validating service data
 * Defines the structure and validation rules for service entries
 */
const ServiceSchema = z.object({
    title: z.string().min(3),
    InfoForRecruiters: z.string().min(100),
    InfoForClients: z.string().min(100),
    Experience: z.string().min(100),
})

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * GET /api/dashboard/service/[serviceId]
 * Retrieves a specific service by ID
 * 
 * @param {NextRequest} request - The incoming request object
 * @param {Object} params - Contains the serviceId from the URL
 * @returns {Promise<NextResponse>} JSON response containing service data or error
 */
export async function GET(
    request : NextRequest,
    { params } : { params : Promise<{ serviceId : string }> } 
) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Get and verify authentication token
        const token = await getToken();
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify JWT token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const { serviceId } = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Find service by ID and user ID
            const service = await Service.findOne({
                _id: serviceId,
                user: decoded.userId,
            });

            if (!service) {
                return NextResponse.json({error: "Service Not found"}, {status: 404});
            }

            // Return service data with specific fields
            return NextResponse.json({
                _id: service._id,
                title: service.title,
                InfoForRecruiters: service.InfoForRecruiters,
                InfoForClients: service.InfoForClients,
                Experience: service.Experience,
            });
        }

        return NextResponse.json({error : "Unauthorized"}, {status:401})
    } catch (err) {
        // Log error and return 500 status
        console.log("GET /api/dashboard/service/[serviceId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/dashboard/service/[serviceId]
 * Updates a specific service by ID
 * 
 * @param {NextRequest} request - The incoming request containing updated service data
 * @param {Object} params - Contains the serviceId from the URL
 * @returns {Promise<NextResponse>} JSON response indicating update success or failure
 */
export async function PATCH(
    request: NextRequest,
    { params } : { params : Promise<{ serviceId : string }> } 
) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Get and verify authentication token
        const token = await getToken();
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify JWT token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const { serviceId } = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Get and validate updated service data
            const body = await request.json();
            const parse = ServiceSchema.safeParse(body);

            if (!parse.success) {
                return NextResponse.json({ error: parse.error }, { status: 400 });
            }

            // Update service if found and authorized
            const updatedService = await Service.findOneAndUpdate(
                {
                    _id: serviceId,
                    user: decoded.userId,
                },
                parse.data,
                { new: true }
            );

            if (!updatedService) {
                return NextResponse.json({ error: "Service not found or not authorized to edit." }, { status: 404 });
            }

            return NextResponse.json({ success: "Service Details updated successfully" });
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (err) {
        // Log error and return 500 status
        console.log("PATCH /api/dashboard/service/[serviceId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/dashboard/service/[serviceId]
 * Deletes a specific service by ID
 * 
 * @param {NextRequest} request - The incoming request object
 * @param {Object} params - Contains the serviceId from the URL
 * @returns {Promise<NextResponse>} JSON response indicating deletion success or failure
 */
export async function DELETE(
    request: NextRequest,
    { params } : { params : Promise<{ serviceId : string }> } 
) {
    try {
        // Connect to MongoDB database
        await connectToDB();
        
        // Get and verify authentication token
        const token = await getToken();
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify JWT token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const { serviceId } = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Find service by ID and user ID
            const service = await Service.findOne({
                _id: serviceId,
                user: decoded.userId,
            });
        
            if (!service) {
                return NextResponse.json({ error: "Service not found or not authorized to delete." }, { status: 404 });
            }

            // Delete the service
            await service.deleteOne();

            return NextResponse.json({ success: "Service deleted successfully." }, { status: 200 });
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (err) {
        // Log error and return 500 status
        console.log("DELETE /api/dashboard/service/[serviceId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}