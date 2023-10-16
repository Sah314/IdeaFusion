import { db } from "@/lib";
import { $Note } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const body = await req.json();
        let {noteId,editorState} = body;
        console.log("editorState",!editorState);

        if(!noteId || !editorState){
            return new NextResponse("Missing editorstate or Note",{status:404});
        }
        noteId = parseInt(noteId);
        const notes = await db.select().from($Note).where(
            eq($Note.id,noteId)
        )
        if(notes.length !=1){
            return new NextResponse("Failed to fetch note",{status:500});
        }
        if(notes[0].editorState!==editorState){
            await db.update($Note).set({
                editorState
            }).where(
                eq($Note.id,noteId)
            )
        }
        return NextResponse.json({
            success:true
        },{status:200});

    } catch (error) {
        return NextResponse.json({
            success:false
        },{status:500});
    }
}