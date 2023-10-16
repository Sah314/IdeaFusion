import TypewriterTitle from '@/components/TypewriterTitle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
export default function Home() {
  return (
    <div className='bg-gradient-to-r min-h-screen grainy from-[#b1d5e2] to-[#ef71ea]'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2'>
            <h1 className=' font-medium text-7xl'>
              <span className='font-bold text-[#165e78]'> AI Assisted </span> Notetaking
            </h1>
            <div className="mt-4"></div>
            <h2 className="font-medium text-3xl text-slate-500 typewriter-text">
            <TypewriterTitle/>
            </h2>
            <div className="mt-4"></div>
            <Link href='/dashboard'>
              <Button className=' bg-[#165e78]'> Get Started
              <ArrowRight className=' ml-2' strokeWidth={3}/>
              </Button>
            </Link>
          </div>


    </div>
   
  )
}
