"use client"

import { Home, Minus, Plus, PlusCircle } from "lucide-react"

import { ActionTooltip } from "@/components/uihelper/action-tooltip"
import { usePrompt } from "@/hooks/use-prompt-store"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"


export const NavigationSelf = ({
   
}) => {

    const router = useRouter();

    
    return (
        <div>
            <ActionTooltip 
                side="right"
                align="center"
                label="Direct message (っ>ω<ς )"
            >
            <button 
                onClick={() => {return router.push(`/meself`)}}
                className="group flex items-center"
            >
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background bg-[#ffe6fa] group-hover:bg-amber-200">
                {/* <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]  h-[36px]",
                    // params?.serverId !== id && "group-hover:h-[20px]",
                    params ? "bg-[#bd9d59]" : "bg-[#ff004c]"
                )} />                                 */}
                <Home
                     className="group-hover:text-red-400  transition text-emerald-200 "
                     size={25}
                    />

                </div>
            </button>
            </ActionTooltip>
        </div>
    )
}