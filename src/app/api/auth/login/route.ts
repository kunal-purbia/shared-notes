import { connectDatabase } from "@/utils/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.Schema";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    await connectDatabase();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Email is not registered" },
        { status: 401 }
      );
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return NextResponse.json(
        { message: "Password is incorrect" },
        { status: 401 }
      );
    }

    const authToken = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET!
    );

    return NextResponse.json(
      { token: authToken, message: "Account login successfull" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while user signup", error);
    return NextResponse.json(
      { message: "Error while signup, check logs" },
      { status: 500 }
    );
  }
}
