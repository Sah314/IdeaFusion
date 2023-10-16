import { Editor } from '@tiptap/react'
import { Bold, Code, CodepenIcon, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, List, ListOrdered, Quote, Redo, Strikethrough, Undo } from 'lucide-react'
import React from 'react'

type Props = {
    editor:Editor
}

const MenuBar = ({editor}: Props) => {
  return (
    <div className='flex flex-wrap gap-2'>
        {/* BOLD */}
        <button onClick={()=>{
            editor.chain().focus().toggleBold().run()
        }} 
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold")?'isActive':''}>
            <Bold className="h-6 w-6"/>
        </button>
        {/* ITALIC */}
        <button onClick={()=>{
            editor.chain().focus().toggleItalic().run()
        }} 
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic")?'isActive':''}>
            <Italic className="h-6 w-6"/>
        </button>
        {/* STRIKETHROUGH */}
        <button onClick={()=>{
            editor.chain().focus().toggleStrike().run()
        }} 
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strikethrough")?'isActive':''}>
            <Strikethrough className="h-6 w-6"/>
        </button>

        <button onClick={()=>{
            editor.chain().focus().toggleCode().run()
        }} 
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code")?'isActive':''}>
            <Code className="h-6 w-6"/>
        </button>

        <button onClick={()=>{
            editor.chain().focus().toggleHeading({level:1}).run()
        }} 
      
        className={editor.isActive("heading",{level:1})?'isActive':''}>
            <Heading1 className="h-6 w-6"/>
        </button>
{/* HEADING2 */}
        <button onClick={()=>{
            editor.chain().focus().toggleHeading({level:2}).run()
        }} 
      
        className={editor.isActive("heading",{level:2})?'isActive':''}>
            <Heading2 className="h-6 w-6"/>
        </button>
{/* HEADING3 */}
        <button onClick={()=>{
            editor.chain().focus().toggleHeading({level:3}).run()
        }} 
      
        className={editor.isActive("heading",{level:3})?'isActive':''}>
            <Heading3 className="h-6 w-6"/>
        </button>
{/* HEADING4 */}
        <button onClick={()=>{
            editor.chain().focus().toggleHeading({level:4}).run()
        }} 
      
        className={editor.isActive("heading",{level:4})?'isActive':''}>
            <Heading4 className="h-6 w-6"/>
        </button>

        <button onClick={()=>{
            editor.chain().focus().toggleHeading({level:5}).run()
        }} 
      
        className={editor.isActive("heading",{level:5})?'isActive':''}>
            <Heading5 className="h-6 w-6"/>
        </button>

        <button onClick={()=>{
            editor.chain().focus().toggleHeading({level:6}).run()
        }} 
      
        className={editor.isActive("heading",{level:6})?'isActive':''}>
            <Heading6 className="h-6 w-6"/>
        </button>
        <button onClick={()=>{
            editor.chain().focus().toggleBulletList().run()
        }} 
      
        className={editor.isActive("bulletList")?'isActive':''}>
            <List className="h-6 w-6"/>
        </button>
        
        <button onClick={()=>{
            editor.chain().focus().toggleOrderedList().run()
        }} 
      
        className={editor.isActive("OrderedList")?'isActive':''}>
            <ListOrdered className="h-6 w-6"/>
        </button>

        <button onClick={()=>{
            editor.chain().focus().toggleCodeBlock().run()
        }} 
      
        className={editor.isActive("codeBlock")?'isActive':''}>
            <CodepenIcon className="h-6 w-6"/>
        </button>

        <button onClick={()=>{
            editor.chain().focus().toggleBlockquote().run()
        }} 
      
        className={editor.isActive("Blockquote")?'isActive':''}>
            <Quote className="h-6 w-6"/>
        </button>

        <button onClick={()=>{
            editor.chain().focus().undo().run()
        }} 
      
        className={editor.isActive("undo")?'isActive':''}>
            <Undo className="h-6 w-6"/>
        </button>
        <button onClick={()=>{
            editor.chain().focus().redo().run()
        }} 
      
        className={editor.isActive("redo")?'isActive':''}>
            <Redo className="h-6 w-6"/>
        </button>

    </div>
  )
}

export default MenuBar