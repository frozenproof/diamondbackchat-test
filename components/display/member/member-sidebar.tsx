"use client"


import { MemberItem } from "../member/member-item";
import { MemberWithProfile } from "@/type";
import { Suspense } from "react";

 
interface MemberSideBarProps {
    memberProp:MemberWithProfile[]
}

export const MemberSideBar = ({
    memberProp
}:MemberSideBarProps) => {
    return (
        <Suspense>

            <div
                    className="flex-1 px-1 overflow-y-scroll"            
                >
                {!!memberProp.length && (
                <div className="mb-2">
                    <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                        members
                    </p>
                    <div className="space-y-[2px]">
                    {memberProp.map((member) => (
                        <MemberItem
                        key={member.id}
                        member={member}
                        />
                    ))}
                    </div>
                </div>
                )}            
       </div>
       </Suspense>
        
    )
}