import { ArrowLeft } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import CreateNoteDialog from '@/components/CreateNoteDialog'

type Props = {}

const Dashboard = (props: Props) => {
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
           {/* List all the notes  */}
           {/* TODO Conditional rendering of notes */}
           <div className='text-bold text-center'>
            <h2 className='text-2xl text-slate-700'>No note yet!</h2>
           </div>
           <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-3">
            <CreateNoteDialog/>
           </div>
        </div>
     </div>
    </>
    
  )
}

export default Dashboard