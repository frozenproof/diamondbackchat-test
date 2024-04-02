"use server"

import { redirect } from "next/navigation";
import { currentUserProfile } from "@/lib/current-profile"

import { ScrollArea } from "@/components/ui/scroll-area";

import { MemberItem } from "../member/member-item";
import { MemberWithProfile } from "@/type";

 
interface MemberSideBarProps {
    memberProp:MemberWithProfile[]
}

export const MemberSideBar = async({
    memberProp
}:MemberSideBarProps) => {
    const profile = await currentUserProfile();
    if(!profile){
        return redirect("/");
    }
    return (
            <ScrollArea
                    className="flex-1 px-1"            
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
       </ScrollArea>
    )
}