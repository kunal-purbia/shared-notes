import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export default async function verifyUser(token: string) {
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET!);
  } catch (error) {
    console.log(error);
    return null;
  }
}
