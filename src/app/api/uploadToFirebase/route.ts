import { db } from "@/lib";
import { uploadFiletoFirebase } from "@/lib/firebase";
import { $Note } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(req:Request){
try {
    const {noteId} = await req.json();
    const note = await db.select().from($Note).where(
        eq($Note.id,parseInt(noteId))
    )
    if(!note[0].imageUrl){
        return new NextResponse("No image URL",{status:404});
    }
    const firebaseURL = await uploadFiletoFirebase(note[0].imageUrl,note[0].name)
    await db.update($Note).set(
        {imageUrl:firebaseURL}
    ).where(eq($Note.id,parseInt(noteId)))
    return new NextResponse("success",{status:200});
} catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error",{status:500})
}
}