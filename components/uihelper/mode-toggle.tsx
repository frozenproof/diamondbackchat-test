"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu
      
    >
      <DropdownMenuTrigger 
          className="focus-visible:ring-none focus-visible:ring-0 focus-visible:ring-offset-0"            
          asChild>
        <Button variant="outline" size="icon" 
        className="bg-transparent border-0 ">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 focus:outline-none outline-none" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 focus:outline-none outline-none" />
          <span className="sr-only focus:outline-none outline-none">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        >
        <DropdownMenuItem 
        onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
        onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
        onClick={() => setTheme("system")}>
          AutoCat
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
