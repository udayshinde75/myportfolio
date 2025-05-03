import { connectToDB } from "@/utils/database";
import { getToken } from "@/utils/getToken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Service } from "@/models/service";
import { z } from "zod";

const ServiceSchema = z.object({
    title: z.string().min(3),
    InfoForRecruiters: z.string().min(100),
    InfoForClients: z.string().min(100),
    Experience: z.string().min(100),
})

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(
    request : NextRequest,
    { params } : { params : Promise<{ serviceId : string }> } 
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { serviceId } = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const service = await Service.findOne({
                _id: serviceId,
                user: decoded.userId,
            });

            if (!service) {
                return NextResponse.json({error: "Servcie Not founf"}, {status: 404});
            }

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
        console.log("GET /api/dashboard/service/[serviceId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params } : { params : Promise<{ serviceId : string }> } 
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { serviceId } = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const body = await request.json();
            const parse = ServiceSchema.safeParse(body);

            if (!parse.success) {
                return NextResponse.json({ error: parse.error }, { status: 400 });
            }

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
        console.log("PATCH /api/dashboard/service/[serviceId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function DELETE(
    request: NextRequest,
    { params } : { params : Promise<{ serviceId : string }> } 
) {
    try {
        await connectToDB();
        const token = await getToken();

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { serviceId } = await params;

        if (typeof decoded !== "string" && "userId" in decoded) {
            const service = await Service.findOne({
                _id: serviceId,
                user: decoded.userId,
            });
        
            if (!service) {
                return NextResponse.json({ error: "Service not found or not authorized to delete." }, { status: 404 });
            }

            await service.deleteOne();

            return NextResponse.json({ success: "Service deleted successfully." }, { status: 200 });
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (err) {
        console.log("DELETE /api/dashboard/service/[serviceId] error", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}