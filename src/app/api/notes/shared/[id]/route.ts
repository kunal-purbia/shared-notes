import { connectDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Note from "@/models/Notes.Schema";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDatabase();
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const note = await Note.findById(id);
  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json({
    title: note.title,
    content: note.content,
    sharedWith: note.sharedWith,
  });
}
