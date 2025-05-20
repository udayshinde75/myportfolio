import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { Passkey } from "@/models/passkey";
import { nanoid } from "nanoid";

/**
 * POST /api/auth/generate-passkey
 * Generates a new unique passkey for user registration
 * Note: This endpoint only works in development environment
 * 
 * @returns {Promise<NextResponse>} JSON response containing the generated passkey or error
 */
export const POST = async () => {
    // Check if we're in development environment
    if (process.env.NODE_ENV !== "development") {
        return NextResponse.json(
            { error: "Passkey generation is only available in development environment" },
            { status: 403 }
        );
    }

    try {
        // Connect to MongoDB database
        await connectToDB();

        // Generate a unique 16-character passkey using nanoid
        const newPasskey = nanoid(16);

        // Create and save new passkey record
        const passkey = new Passkey({ key: newPasskey });
        await passkey.save();

        // Return the generated passkey
        return NextResponse.json({ passkey: newPasskey }, { status: 201 });

    } catch (error) {
        // Log error and return 500 status
        console.error("Error generating passkey:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
