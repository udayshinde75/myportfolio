import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { User } from "@/models/user";
import { Passkey } from "@/models/passkey";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY; // Admin secret passkey

export const POST = async (req: Request) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        // Parse request body
        const body = await req.json();

        // Validate request body using Zod
        const validation = RegisterSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        const { name, email, password, passkey } = validation.data;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Validate the passkey
        const passkeyRecord = await Passkey.findOne({ key: passkey });
        if (!passkeyRecord) {
            return NextResponse.json({ error: "Invalid passkey" }, { status: 403 });
        }

        if (passkeyRecord.used) {
            return NextResponse.json({ error: "Passkey already used" }, { status: 403 });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Mark the passkey as used
        passkeyRecord.used = true;
        await passkeyRecord.save();

        return NextResponse.json({ success: "Account created successfully. Please Login." }, { status: 201 });

    } catch (error) {
        console.error("Error in registration:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
