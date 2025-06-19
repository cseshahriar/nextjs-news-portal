import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

import { customSendEmail } from "@/utility/EmailUtility";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url);
        let email = searchParams.get('email');
        console.log('----------------', email);

        // user count
        const count = await prisma.users.count({where: {email: email}});
        if(count === 1) {
            let otp = Math.floor(100000+Math.random()*900000);
            let body = `Your OTP code is ${otp}`;
            let subject = "Next News Verification Code"
            await customSendEmail(email, subject, body);
            let result = await prisma.users.update(
                {
                    where:{email: email},
                    data: {otp: otp.toString()}
                }
            )
            const { password, ...userWithoutPassword } = result;
            return NextResponse.json({
                status: "success", data: userWithoutPassword}, { status: 200}
            );
        } else {
            return NextResponse.json({
                 status: "fail", error: `No user found by given email ${email}` },
                  { status: 400 }
            );
        }
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ status: "fail", error: error.message }, { status: 400 });
    }
}