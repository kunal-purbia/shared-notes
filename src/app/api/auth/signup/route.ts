import { connectDatabase } from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.Schema";

export async function POST(req: NextRequest) {
  try {
    await connectDatabase();
    const { email, password } = await req.json();

    const existingUserCheck = await User.findOne({ email });

    if (existingUserCheck) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return NextResponse.json(
      { message: "Account sign up successfull" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while user signup", error);
    return NextResponse.json(
      { message: "Error while signup, check logs" },
      { status: 500 }
    );
  }
}
