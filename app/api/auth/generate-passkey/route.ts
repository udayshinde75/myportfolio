import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { Passkey } from "@/models/passkey";
import { nanoid } from "nanoid";

export const POST = async () => {
    try {
        await connectToDB();

        // Generate a unique passkey
        const newPasskey = nanoid(16); // 16-character random key

        // Save it to the database
        const passkey = new Passkey({ key: newPasskey });
        await passkey.save();

        return NextResponse.json({ passkey: newPasskey }, { status: 201 });

    } catch (error) {
        console.error("Error generating passkey:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
