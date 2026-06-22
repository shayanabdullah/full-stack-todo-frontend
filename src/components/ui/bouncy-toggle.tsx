
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface PremiumToggleProps {
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
}
import React from "react"
import { FaRegMoon } from "react-icons/fa"
import { LuSun } from "react-icons/lu"

export function PremiumToggle({ defaultChecked = false, onChange, label }: PremiumToggleProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked)
  const [isPressed, setIsPressed] = useState(false)
  const [theme, setTheme] = useState(()=>{
      const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

useEffect(()=> {
  const body = window.document.documentElement

    body.classList.remove('light', 'dark');
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
}, [theme])

  const handleToggle = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    onChange?.(newValue)
  }

  return (
    <div className="flex items-center gap-3" onClick={toggleTheme}>
      {label && (
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            isChecked ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {label}
        </span>
      )}
      <button
        role="switch"
        aria-checked={isChecked}
        onClick={handleToggle}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={cn(
          "group relative h-8 w-18 rounded-full p-1 transition-all duration-500 ease-out flex items-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
       "dark:bg-white bg-gray-200",
        )}
      >
     
       
   <i className={`absolute top-1/2 left-2 z-10 -translate-y-1/2 text-base dark:text-black! `}> <LuSun /></i>

        {/* Thumb */}
        <div
          className={cn(
            "relative h-7 w-8 rounded-full shadow-lg transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]",
            "bg-background",
            isChecked ? "translate-x-8" : "translate-x-0",
            isPressed && "duration-150",
            theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
          )}
       />
       
        <i className={`absolute top-1/2 right-2 z-10 -translate-y-1/2 text-bas dark:text-white  text-muted-foreground`}><FaRegMoon /></i>
      </button>
    </div>
  )
}
