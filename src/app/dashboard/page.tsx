import { ArrowLeft } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import CreateNoteDialog from '@/components/CreateNoteDialog'
import { db } from '@/lib'
import { $Note } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'

type Props = {}

const Dashboard = async(props: Props) => {
  const {userId} = auth();
  const notes = await db.select().from($Note).where(
    eq($Note.userId,userId!)
  )
  return (
    <>
    <div
     className='grainy min-h-screen'>
        <div className='max-w-7xl mx-auto p-8'>
          <div className="h-14"></div>
            <div className='flex justify-between items-center md:flex-row flex-col'>
                <div className='flex item-center'>
                    <Link href='/'>
                    <Button className='bg-[#165e78]'>
                        <ArrowLeft className=' mr-2' strokeWidth={3}/>
                        Back
                    </Button>
                    </Link>
                    <div className="w-4"></div>
                    <h1 className=' ml-4 text-3xl font-bold text-slate-700'>My Notes</h1>
                    <div className="w-4"></div>
                    <UserButton/>
                </div>
            </div>
          <div className='h-7'></div>
           <Separator/>
           <div className='h-7'></div>

           {/* List all the notes  */}
           {/* TODO Conditional rendering of notes */}
           {/* If no notes display this  */}
           {notes.length===0 && (
            <div className='text-bold text-center'>
            <h2 className='text-2xl text-slate-700'>No note yet!</h2>
           </div>
           )}
           
           <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-3 mt-5">
            <CreateNoteDialog/>
            {notes.map((note=>{
              return (
                <a href={`/notebook/${note.id}`} key={note.id}>
                    <div className='rounded-lg flex flex-col overflow-hidden hover:shadow-xl transition hover:-translate-y-1'>
                      <Image width={400} height={200} alt={note.name} src={note.imageUrl || ""}/>
                      <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800">{note.name}</h3>
                      <div className="h-1"></div>
                      <p className='text-sm text-gray-500'>
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    </div>
                    
                </a>
              )
            }))}
           </div>
        </div>
     </div>
    </>
    
  )
}

export default Dashboard