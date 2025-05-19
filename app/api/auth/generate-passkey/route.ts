import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { Passkey } from "@/models/passkey";
import { nanoid } from "nanoid";

/**
 * POST /api/auth/generate-passkey
 * Generates a new unique passkey for user registration
 * 
 * @returns {Promise<NextResponse>} JSON response containing the generated passkey or error
 */
export const POST = async () => {
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
