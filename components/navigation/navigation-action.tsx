"use client"

import { Plus } from "lucide-react"

import { ActionTooltip } from "@/components/uihelper/action-tooltip"

export const NavigationAction = () => {
    return (
        <div>
            <ActionTooltip 
                side="bottom"
                align="center"
                label="Add a server (っ>ω<ς )"
            >
            <button className="group flex items-center">
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background bg-neutral-700 group-hover:bg-amber-200">
                    <Plus
                     className="group-hover:text-red-400  transition text-emerald-200 "
                     size={25}
                    />

                </div>
            </button>
            </ActionTooltip>
        </div>
    )
}