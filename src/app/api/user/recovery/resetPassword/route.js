import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()

export async function POST(req, res) {
    try {
        let reqBody = await req.json();
        // user count
        const count = await prisma.users.count(
            {
                where: {
                    email: reqBody['email'],
                    otp: reqBody['otp']
                }
            }
        );
        if(count === 1) {
            const new_raw_pass = reqBody['password'];
            const hashedPassword = await bcrypt.hash(new_raw_pass, 10);
             const user = await prisma.users.update({
                where: {
                    email: reqBody['email'], // 👈 Ensure this is unique or use `id`
                },
                data: {
                    otp: '', // reset
                    password: hashedPassword, // Replace plain text password
                }
            });
            const { password, ...userWithoutPassword } = user;
            return NextResponse.json({ status: "success", data: userWithoutPassword });
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