import verifyToken from "@/lib/auth";
import { connectDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Note from "@/models/Notes.Schema";

export async function GET(req: NextRequest, { params }) {
  await connectDatabase();

  const user: any = await verifyToken(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const note = await Note.findById(params.id);
  if (!note || note.userId !== user.id) {
    return NextResponse.json({ error: "Note not found." }, { status: 404 });
  }

  return NextResponse.json(note);
}
