import { db } from "@/lib";
import { genPrompt, generateImage } from "@/lib/openai";
import { $Note } from "@/lib/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime= "edge";
export async function POST(req:Request){
    const {userId} = auth();
    if(!userId){
        return new NextResponse("unauthorized access",{status:401});
    }
    const body = await req.json();
    const {name} = body;
    const image_desc = await genPrompt(name);
    if(!image_desc){
        return new NextResponse("Not able to generate a image description",{status:500});
    }
    const image_url = await generateImage(image_desc);
    if(!image_url){
        return new NextResponse("Image couldn't be generated",{status:500})
    }
    const notes_ids = await db.insert($Note).values({
        name,
        userId,
        imageUrl:image_url,
    }).returning({
        insertedId:$Note.id
    });

    return NextResponse.json({note_id:notes_ids[0].insertedId});
}