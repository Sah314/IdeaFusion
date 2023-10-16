'use client'
import React from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {
    NoteId:number
}

const Deletebutton = ({NoteId}: Props) => {
  
  const router = useRouter()
  const deleteNote = useMutation({
      mutationFn:async()=>{
        const response  = await axios.post('/api/deleteNote',{
          NoteId
        })
        return response.data;
      }
  })
  return (
    <Button variant={'destructive'} size='sm' onClick={()=>{
        const confirm = window.confirm("Are you sure you want to delete this note?")
        if(!confirm) return;
        deleteNote.mutate(undefined,{
          onSuccess:()=>{
            console.log("Successfully deleted note");
            router.push('/dashboard');
          },
          onError:(err)=>{
              console.error(err);
          }
        })
    }} >
        <Trash/>
    </Button>
  )
}

export default Deletebutton