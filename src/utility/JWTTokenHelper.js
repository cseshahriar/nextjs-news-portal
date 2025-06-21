import { PrismaClient } from "@/generated/prisma";
import { SignJWT, jwtVerify } from "jose";

const prisma = new PrismaClient()

export async function createToken(email, id) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "uD#48KzYv@l%1mqN9eBt$zW!o8j^2cA7");
    let token = await new SignJWT({email: email, id: id})
                .setProtectedHeader({alg: 'HS256'})
                .setIssuedAt()
                .setIssuer(process.env.JWT_ISSUER || "Localhost")
                .setExpirationTime(process.env.JWT_EXPIRATION_TIME || "24h")
                .sign(secret);
    return token;
}


export async function verifyToken(token){
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jwtVerify(token,secret)
    return decoded['payload'];
}

