import { Button } from '@/components/ui/button';
import { db } from '@/lib';
import { $Note } from '@/lib/schema';
import { auth } from '@clerk/nextjs';
import {and,eq} from 'drizzle-orm'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { NextResponse } from 'next/server';
import React from 'react'
import { clerk } from '@/lib/clerk-server';
import TiptapEditor from '@/components/TiptapEditor';
import Deletebutton from '@/components/Deletebutton';

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
const user = await clerk.users.getUser(userId);

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
    <div className='min-h-screen grainy p-7'>
        <div className="mx-auto max-w-4xl">
            <div className="border shadow-lg border-stone-200 rounded-xl p-4 flex items-center">
                <Link href='/dashboard'>
                    <Button className="bg-[#7a4593]" size='sm'><ArrowLeft className='mr-2' strokeWidth={3}/> Back</Button>
                </Link>
                <div className="w-3"></div>
                <span className='font-semibold'>{user.firstName} {user.lastName}</span>
                <span className='inline-block mx-1'>/</span>
                <div className="text-stone-500 font-semibold">{note.name}</div>
                <div className="ml-auto"><Deletebutton NoteId={note.id}/></div>
            </div>
            <div className="h-4"></div>
            <div className="border-stone-200 shadow-xl border rounded-lg px-14 py-8 w-full">
                <TiptapEditor note={note}/>
            </div>
        </div>
    </div>
  )
}

export default NotebookPage