"use client"

import { Minus, Plus, PlusCircle } from "lucide-react"

import { ActionTooltip } from "@/components/uihelper/action-tooltip"
import { useModal } from "@/hooks/use-modal-store"

export const NavigationAction = () => {
    const {onOpen} = useModal();

    return (
        <div>
            <ActionTooltip 
                side="right"
                align="center"
                label="Add a server (っ>ω<ς )"
            >
            <button 
                onClick={() => onOpen("CreateServer")}
                className="group flex items-center"
            >
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background bg-[#ffe6fa] group-hover:bg-amber-200">
                    <PlusCircle
                     className="group-hover:text-red-400  transition text-emerald-200 "
                     size={25}
                    />

                </div>
            </button>
            </ActionTooltip>
        </div>
    )
}