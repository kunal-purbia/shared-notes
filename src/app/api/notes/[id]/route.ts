/* eslint-disable @typescript-eslint/no-explicit-any */
import verifyToken from "@/lib/auth";
import { connectDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Note from "@/models/Notes.Schema";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDatabase();

  if (!params || !params.id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const user: any = await verifyToken(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const note = await Note.findById(params.id);
  if (!note || note.userId !== user.userId) {
    return NextResponse.json({ error: "Note not found." }, { status: 404 });
  }

  return NextResponse.json(note);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDatabase();
  if (!params || !params.id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const user: any = await verifyToken(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const note = await Note.findById(params.id);
  if (!note || note.userId !== user.userId) {
    return NextResponse.json({ error: "Note not found." }, { status: 404 });
  }

  const { title, content, sharedWith } = await req.json();

  note.title = title || note.title;
  note.content = content || note.content;
  note.sharedWith = sharedWith || note.sharedWith;

  await note.save();
  return NextResponse.json(note);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDatabase();
  if (!params || !params.id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const user: any = await verifyToken(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const note = await Note.findById(params.id);
  if (!note || note.userId !== user.userId) {
    return NextResponse.json({ error: "Note not found." }, { status: 404 });
  }

  await note.deleteOne();

  return NextResponse.json({ message: "Note deleted successfully" });
}
