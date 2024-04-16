"use client"


import { MemberItem } from "../member/member-item";
import { MemberWithProfile } from "@/type";
import { Suspense } from "react";

interface MemberSideBarProps {
    memberProp:MemberWithProfile[]
    userProfileIdProp: string    
}

export const MemberSideBar = ({
    memberProp,
    userProfileIdProp
}:MemberSideBarProps) => {
    return (
        <div
            className="flex-1 px-1 overflow-y-scroll"            
        >
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                members
            </p>
            {!!memberProp.length && (
                <Suspense
                    fallback={
                        <div>
                            Loading members
                        </div>
                    }
                >
                    <div className="space-y-[2px]">
                    {memberProp.map((member) => (
                        <MemberItem
                        key={member.id}
                        member={member}
                        userProfileIdProp={userProfileIdProp}
                        />
                    ))}
                    </div>
                </Suspense>
            )}            
       </div>        
    )
}