import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createToken } from "@/utility/JWTTokenHelper";
import { cookies } from "next/headers";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // 1. Find user by email
        const user = await prisma.users.findUnique({
            where: { email },
        });
        if (!user) {
            return NextResponse.json(
                { status: "fail", error: "User not found" }, { status: 404 }
            );
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({
                 status: "fail", error: "Invalid password" }, { status: 401 });
        }

        // 3. Generate JWT token (optional but recommended)
        const token =  await createToken(user.email, user.id);

        // create cookies
        let expiredDuration = new Date(Date.now() + 24*60*60*1000);
        const cookiesString = `token=${token}; Expires:${expiredDuration}; path:/`;

        // ✅ Set cookie properly
        cookies().set({
            name: "token",
            value: token,
            httpOnly: true,
            path: "/",
            maxAge: 24 * 60 * 60, // 1 day
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return NextResponse.json(
            {
            status: "success",
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    token,
                },
            },
            {status:200}
        );
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ status: "fail", error: error.message }, { status: 500 });
    }
}
