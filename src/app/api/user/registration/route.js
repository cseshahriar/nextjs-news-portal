import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const payload = await req.json();
        const prisma = new PrismaClient();

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(payload.password, 10);

        const user = await prisma.users.create({
            data: {
                ...payload,
                password: hashedPassword, // Replace plain text password
            }
        });

        const { password, ...userWithoutPassword } = user;
        return NextResponse.json({ status: "success", data: userWithoutPassword });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ status: "fail", error: error.message });
    }
}
