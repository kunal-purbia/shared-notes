import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export default async function verifyToken(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET!);
  } catch (error) {
    console.log(error)
    return null;
  }
}
