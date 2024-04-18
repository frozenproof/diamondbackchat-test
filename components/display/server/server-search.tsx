"use client"

import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../ui/command";
import { MemberWithProfile } from "@/type";
import { usePrompt } from "@/hooks/use-prompt-store";

interface ServerSearchProps {
    userId: string;
    data: {
        label: string;
        type: "channel" | "member",
        data: {
            icon:React.ReactNode;
            name: string;
            id: string;
            member?: MemberWithProfile;
        }[] | undefined
    }[]
};

export const ServerSearchBar = ({
  userId,
  data
}: ServerSearchProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
    const {onOpen} = usePrompt();
  
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      }
  
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down)
    }, []);
  
    const onClick = ({ id, type, member }: { id: string, type: "channel" | "member", member? : MemberWithProfile}) => {
      setOpen(false);
  
      if (type === "member" && member) {
        onOpen("UserProfileDisplay", {userProfilePropAPI:member.userProfile, currentUserPropAPIID:userId})
      }
  
      if (type === "channel") {
        return router.push(`/servers/${params?.serverId}/channels/${id}`)
      }
    }
  
    console.log("data from server-search",data)
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full transition"
        >
          <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <p
            className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
          >
            Search this (　･ω･)☞
          </p>
          {/* <kbd
            className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
          >
            <span className="text-xs bg-transparent">(　･ω･)☞</span>
          </kbd> */}
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search everything you want" />
            <CommandList>
                <CommandEmpty>
                Are you sure you are writing ?
                </CommandEmpty>
                {data.map(({ label, type, data }) => {
                if (!data?.length) return null;    
                return (
                    <CommandGroup key={label} heading={label}>
                        {data?.map(({ id, icon, name, member }) => {
                        console.log(member)  
                        return (
                            <CommandItem key={id} onSelect={() => onClick({ id, type, member })}>
                            {icon}
                            <span>{name}</span>
                            </CommandItem>
                        )
                        })}
                    </CommandGroup>
                )
                })}
            </CommandList>
        </CommandDialog>
      </>
    )
}
 
 