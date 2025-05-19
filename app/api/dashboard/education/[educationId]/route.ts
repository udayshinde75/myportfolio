import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Education } from "@/models/education";
import { z } from "zod";

/**
 * Zod schema for validating education data
 * Defines the structure and validation rules for education entries
 */
const EducationSchema = z.object({
    title: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    universityName: z.string().min(1),
    universityIcon: z.string().url(),
    universityLink: z.string().url().optional().or(z.literal("")),
    location: z.string().min(1),
    description: z.string().min(100),
    skills: z.array(z.string()).optional(),
    proof: z.string().url().optional(),
    score: z.string().min(1),
    scoreType: z.enum(["CGPA", "Percentage", "Grade"]),
});

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * GET /api/dashboard/education/[educationId]
 * Retrieves a specific education entry by ID
 * 
 * @param {NextRequest} request - The incoming request object
 * @param {Object} params - Contains the educationId from the URL
 * @returns {Promise<NextResponse>} JSON response containing education data or error
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ educationId: string }> }
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
        const { educationId } = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Find education entry by ID and user ID
            const education = await Education.findOne({
                _id: educationId,
                user: decoded.userId,
            });

            if (!education) {
                return NextResponse.json({ error: "Degree not found" }, { status: 404 });
            }

            // Return education data with specific fields
            return NextResponse.json({
                _id: education._id,
                title: education.title,
                startDate: education.startDate,
                endDate: education.endDate,
                universityName: education.universityName,
                universityIcon: education.universityIcon,
                universityLink: education.universityLink,
                location: education.location,
                description: education.description,
                skills: education.skills,
                proof: education.proof,
                score: education.score,
                scoreType: education.scoreType,
            });
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (err) {
        // Log error and return 500 status
        console.log("GET /api/dashboard/education/[educationId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/dashboard/education/[educationId]
 * Updates a specific education entry by ID
 * 
 * @param {NextRequest} request - The incoming request containing updated education data
 * @param {Object} params - Contains the educationId from the URL
 * @returns {Promise<NextResponse>} JSON response indicating update success or failure
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ educationId: string }> }
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
        const { educationId } = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Get and validate updated education data
            const body = await request.json();
            const parse = EducationSchema.safeParse(body);

            if (!parse.success) {
                return NextResponse.json({ error: parse.error }, { status: 400 });
            }

            // Update education entry if found and authorized
            const updatedEducation = await Education.findOneAndUpdate(
                {
                    _id: educationId,
                    user: decoded.userId,
                },
                parse.data,
                { new: true }
            );

            if (!updatedEducation) {
                return NextResponse.json({ error: "Education not found or not authorized to edit." }, { status: 404 });
            }

            return NextResponse.json({ success: "Education Details updated successfully" });
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (err) {
        // Log error and return 500 status
        console.log("PATCH /api/dashboard/Education/[educationId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/dashboard/education/[educationId]
 * Deletes a specific education entry by ID
 * 
 * @param {NextRequest} request - The incoming request object
 * @param {Object} params - Contains the educationId from the URL
 * @returns {Promise<NextResponse>} JSON response indicating deletion success or failure
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ educationId: string }> }
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
        const { educationId } = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            // Find education entry by ID and user ID
            const education = await Education.findOne({
                _id: educationId,
                user: decoded.userId,
            });
        
            if (!education) {
                return NextResponse.json({ error: "Education not found or not authorized to delete." }, { status: 404 });
            }

            // Delete the education entry
            await education.deleteOne();

            return NextResponse.json({ success: "Education deleted successfully." }, { status: 200 });
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (err) {
        // Log error and return 500 status
        console.log("DELETE /api/dashboard/education/[educationId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}