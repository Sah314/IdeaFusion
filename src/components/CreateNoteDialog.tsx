'use client'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Loader2, Plus } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from "axios";
import router from 'next/router'
import { useRouter } from 'next/navigation'
type Props = {}

const CreateNoteDialog = (props: Props) => {
const [input,setInput] = React.useState('');
const router = useRouter()
const createNote = useMutation({
    mutationFn: async()=>{
        const response = await axios.post('/api/createNote',{
            name:input
        });
        return response.data;
    }
})

const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();
if(input ===''){
    window.alert('Please enter a name for the note');
    return
}
createNote.mutate(undefined,{
    onSuccess:({note_id})=>{
        console.log("yayyy note created",{note_id});
        router.push(`notebook/${note_id}`);
    },
    onError:(error)=>{
        console.error(error);
        window.alert("Couldn't create a new note")
    }
})

}
  return (
    <Dialog>
        <DialogTrigger>
            <div className='border-dashed border-2 flex border-[#165e78] h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4'>
                <Plus className="w-6 h-6 text-[#165e78]" strokeWidth={3}/>
                <h2 className='font-semibold text-[#165e78] sm: mt-3'>New note</h2>
            </div>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                Add Note
                </DialogTitle>
                <DialogDescription>
                Create your new note by clicking below button!
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <Input placeholder='Name' value={input} onChange={e=>setInput(e.target.value)}/>
                <div className="h-4"></div>
                <div className="flex items-center">
                    <Button type='reset' variant={'secondary'}>Cancel</Button>
                    <Button className='bg-[#165e78] ml-3' type='submit' disabled={createNote.isLoading} > {createNote.isLoading && (<Loader2 className='w-4 h-4 mr-2 animate-spin'/>)} Create</Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog