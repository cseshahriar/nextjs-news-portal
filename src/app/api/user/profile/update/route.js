import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const headerList = headers(); // ✅ NO await
    const id = parseInt(headerList.get("id"));

    const reqBody = await req.json();

    // Conditionally hash password if provided
    if (reqBody.password) {
      reqBody.password = await bcrypt.hash(reqBody.password, 10);
    } else {
      delete reqBody.password;
    }

    const prisma = new PrismaClient();
    const result = await prisma.users.update({
      where: { id },
      data: reqBody,
    });

    const { password, ...userWithoutPassword } = result;
    return NextResponse.json({ status: "success", data: userWithoutPassword });
  } catch (e) {
    console.error("Update error:", e);
    return NextResponse.json({ status: "fail", data: e.toString() });
  }
}
