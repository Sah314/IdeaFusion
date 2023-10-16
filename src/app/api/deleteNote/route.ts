import { db } from "@/lib";
import { $Note } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req:Request){
const {NoteId} = await req.json();
console.log("noteId:" ,NoteId);
await db.delete($Note).where(
    eq($Note.id,parseInt(NoteId))
)
return new NextResponse("Deleted Successfully",{status:201})
}