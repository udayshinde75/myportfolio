import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import Jwt  from "jsonwebtoken";
import { Service } from "@/models/service";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET() {
    try {
        await connectToDB();
        const Token = await getToken();

        if (!Token) {
            return NextResponse.json({error:"Unauthorized"}, {status: 401});
        }

        const decoded = Jwt.verify(Token, JWT_SECRET);

        if (typeof decoded !== "string" && "userId" in decoded) {
            const service = await Service.find({user: decoded.userId}).sort({createdAt: -1});
            //console.log(service);
            return NextResponse.json(service);
        }

        return NextResponse.json({error: "Unauthorized"}, {status:401})
    } catch (err) {
        console.log("api/dashboard/service GET API : "+ err);
        return NextResponse.json({error: "Something went wrong"}, {status : 500})
    }
}

export async function POST (req: Request) {
    try {
        await connectToDB();
        const Token = await getToken();

        if (!Token) {
            return NextResponse.json({error : "Unauthorized"}, {status : 401});
        }

        const decoded = Jwt.verify(Token, JWT_SECRET);

        if (typeof decoded !== "string" && "userId" in decoded) {

            const body = await req.json();

            const newService = new Service({
                ...body,
                user: decoded.userId
            });

            await newService.save();

            return NextResponse.json({success: "Servcie Created Successfully"}, {status: 201});
        }
    } catch (err) {
        console.error("api/dashboard/service method: post:", err);
        return NextResponse.json(
        { error: "Failed to create service" },
        { status: 500 }
        );
    }
}
