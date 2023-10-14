import { db } from '@/lib';
import { $Note } from '@/lib/schema';
import { auth } from '@clerk/nextjs';
import {and,eq} from 'drizzle-orm'
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import React from 'react'

type Props = {
    params:{
        notesId:string;
    }
}

const NotebookPage = async({params:{notesId}}: Props) => {
    console.log(notesId);
    const {userId} = auth();
    if(!userId){
        return redirect('/dashboard');  
    }
    const notes = await db.select().from($Note).where(
        and(
            eq($Note.id,parseInt(notesId)),
            eq($Note.userId,userId)
        )
    )
    if(notes.length!=1){
        return redirect('/dashboard');
    }
    const note = notes[0];
  return (
    <pre >{ JSON.stringify(note,null,2)}</pre>
  )
}

export default NotebookPage