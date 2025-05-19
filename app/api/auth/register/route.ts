import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { User } from "@/models/user";
import { Passkey } from "@/models/passkey";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";

/**
 * POST /api/auth/register
 * Handles new user registration with passkey validation
 * 
 * @param {Request} req - The incoming request containing user details and passkey
 * @returns {Promise<NextResponse>} JSON response indicating registration success or failure
 */
export const POST = async (req: Request) => {
    try {
        // Connect to MongoDB database
        await connectToDB();

        // Parse and validate request body using Zod schema
        const body = await req.json();
        const validation = RegisterSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        const { name, email, password, passkey } = validation.data;

        // Check for existing user with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Validate the registration passkey
        const passkeyRecord = await Passkey.findOne({ key: passkey });
        if (!passkeyRecord) {
            return NextResponse.json({ error: "Invalid passkey" }, { status: 403 });
        }

        // Check if passkey has already been used
        if (passkeyRecord.used) {
            return NextResponse.json({ error: "Passkey already used" }, { status: 403 });
        }

        // Hash password using bcrypt for secure storage
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Mark the passkey as used to prevent reuse
        passkeyRecord.used = true;
        await passkeyRecord.save();

        // Return success response
        return NextResponse.json({ success: "Account created successfully. Please Login." }, { status: 201 });

    } catch (error) {
        // Log error and return 500 status
        console.error("Error in registration:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
