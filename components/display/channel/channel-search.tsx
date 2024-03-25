"use client"

import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../ui/command";


export const ChannelSearchBar = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
  
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      }
  
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down)
    }, []);
  
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="group px-2 py-2 rounded-md flex ml-auto gap-x-2 w-full transition"
        >
          <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400 ml-auto" />
          
        </button>
        
      </>
    )
}
 
 