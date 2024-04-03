"use client"

import { Home } from "lucide-react"

import { ActionTooltip } from "@/components/uihelper/action-tooltip"

import { useRouter } from "next/navigation"
import { useEffect } from "react"


export const NavigationSelf = ({

} ) => {

    const router = useRouter();

    return (
        <div>
            <ActionTooltip 
                side="right"
                align="center"
                label="Direct message (っ>ω<ς )"
            >
            <button 
                onClick={() => {return router.push(`/meself/friend`)}}
                className="group flex items-center"
            >
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background bg-[#ffe6fa] group-hover:bg-amber-200">

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