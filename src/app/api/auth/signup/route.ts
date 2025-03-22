import { connectDatabase } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDatabase();
    console.log(req.body);
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
