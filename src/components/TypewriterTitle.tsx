'use client'
import React from 'react'
import Typewriter from 'typewriter-effect'
type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
     
      <Typewriter 
        options={
          {
            loop:true,
            delay:150,
  
          }
        }
        onInit={(Typewriter)=>{

          Typewriter.typeString("Turbocharge Your Notes \u{1F680}").pauseFor(3000).deleteAll().typeString(" Elevate Your Notes: AI-Powered Efficiency 🧠").start()
        }}
      />
  )
}

export default TypewriterTitle