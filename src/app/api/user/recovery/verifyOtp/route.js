import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export async function POST(req, res) {
    try {
        let reqBody = await req.json();
        // user count
        const count = await prisma.users.count({where: reqBody});
        if(count === 1) {
            return NextResponse.json({
                status: "success", data: "Valid OTP Code"}, { status: 200}
            );
        } else {
            return NextResponse.json({
                 status: "fail", error: `Invalid OTP code` },
                  { status: 400 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { status: "fail", error: error.message },
            { status: 400 }
        );
    }
}