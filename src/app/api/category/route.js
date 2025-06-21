
import {NextResponse} from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()

export async function GET(req, res) {
    try{
        const result = await prisma.categories.findMany({select:{id:true, name:true}})
        return NextResponse.json({status: "success", data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail", data:e})
    }
}