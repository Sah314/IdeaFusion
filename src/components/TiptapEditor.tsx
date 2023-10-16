'use client'
import React, { useEffect } from 'react'
import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit"
import MenuBar from './MenuBar';
import { Button } from './ui/button';
import useDebounce from '@/lib/useDebounce';
import Text from "@tiptap/extension-text"
import { useMutation } from '@tanstack/react-query';
import { NoteType } from '@/lib/schema';
import {useCompletion} from 'ai/react'
import axios from 'axios';
type Props = {
  note:NoteType
};

const TiptapEditor = ({note}: Props) => {
  const [editorState, setEditorState] = React.useState(note.editorState || "");
    
  const {complete,completion} =useCompletion({
    api:'/api/aicomplete'
  })
    const saveNote = useMutation({
      mutationFn: async()=>{
        console.log("inside mutate")
        const response = await axios.post('/api/saveNote',{
          noteId:note.id,
          editorState
        })
        return response.data
      }
    })
    const customText = Text.extend({
      addKeyboardShortcuts() {
          return {
            'Alt-a':()=>{
              const prompt= this.editor.getText().split(" ").slice(-30).join(" ");
              complete(prompt)
              // console.log(prompt)
              return true;
            }
          }
      },
    })

    
    const editor = useEditor({
        autofocus:true,
        extensions:[StarterKit,customText],
        content:editorState,
        onUpdate:({editor})=>{
            setEditorState(editor.getHTML());
        }
    })
const lastCompletion = React.useRef('');
    useEffect(() => {
      if (!editor || !completion) return 
      const token = completion.slice(lastCompletion.current.length);
      lastCompletion.current = completion
      console.log(token)
      editor?.commands.insertContent(token)
     }, [completion,editor])

const debeditorState = useDebounce(editorState,500);


useEffect(() => {
  //save to DB
  if(debeditorState !=='') return saveNote.mutate(undefined,{
    onSuccess:data=>{
      console.log('success update!',data);
    },
    onError: err=>{
      console.error(err);
    }
  })
  
}, [debeditorState])


  return (
    <div>
        <div className="flex">
{editor && <MenuBar editor={editor}/>
}            <Button className='mx-auto' disabled variant={"ghost"} >{saveNote.isLoading?"Saving...":"Saved"}</Button>
        </div>
        <div className="h-5"></div>
        <div className='prose prose-sm w-full mt-2'>
            <EditorContent editor={editor}/>
        </div>
        <div className="h-5"></div>
        <span className='text-sm'>
          Tip : Press {" "} <kbd className=' text-md text-gray-800 bg-gray-100 rounded-lg font-semibold'>
            Shift + A
          </kbd>
          {" "} for AI autocomplete
        </span>
    </div>
  )
}

export default TiptapEditor