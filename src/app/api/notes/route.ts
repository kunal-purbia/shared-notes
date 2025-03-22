import { connectDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Note from "@/models/Notes.Schema";
import verifyToken from "@/lib/auth";

export async function POST(req: NextRequest) {
  await connectDatabase();

  const { title, content, sharedWith } = await req.json();

  const user: any = await verifyToken(req);
  if (!user)
    return NextResponse.redirect("/auth/login");

  if (!title || !content) {
    return NextResponse.json(
      { message: "Title and content are required" },
      { status: 400 }
    );
  }

  const note = await Note.create({
    userId: user.id,
    title,
    content,
    sharedWith,
  });

  return NextResponse.json(note, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectDatabase();

  const user: any = await verifyToken(req);
  if (!user)
    return NextResponse.redirect("/auth/login");

  const notes = await Note.find({ userId: user.id });
  return NextResponse.json(notes);
}
