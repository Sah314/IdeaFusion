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
  
          }
        }
        onInit={(Typewriter)=>{
          Typewriter.typeString("<span>\u{1F680}</span> Turbocharge Your Notes").pauseFor(2000).deleteAll().typeString("<span>🧠</span> Elevate Your Notes: AI-Powered Efficiency").start()
        }}
      />
  )
}

export default TypewriterTitle