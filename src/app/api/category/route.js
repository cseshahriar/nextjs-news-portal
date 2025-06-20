
import {NextResponse} from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export async function GET(req, res) {
    try{
        const result = await prisma.categories.findMany({select:{id:true, name:true}})
        console.log(result);
        return NextResponse.json({status: "success", data:result})
    }
    catch (e) {
        console.log(e);
        return  NextResponse.json({status:"fail", data:e})
    }
}