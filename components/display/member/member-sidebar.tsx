"use server"

import { Channel, Member, OldChannelType, OldMemberRole, Server, UserProfile } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Hash, Magnet, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerNavigation } from "../server/server-navigation";

import { MemberItem } from "../member/member-item";
import { MemberWithProfile, ServerWithMembersWithProfiles } from "@/type";

 
  const roleIconMap :{[key: string]: React.ReactNode}= {
    [OldMemberRole.GUEST]       : null,
    [OldMemberRole.MEMBER]      : <Magnet className="mr-2"/>,
    [OldMemberRole.MODERATOR]   : <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
    [OldMemberRole.ADMIN]       : <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
  }
  
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
                        // role={member.role}
                        // user={member.userProfile}
                        />
                        // <div
                        //   key={member.id}
                        // >
                        //   {member.userProfile.name}
                        //   </div>
                    ))}
                    </div>
                </div>
                )}            
       </ScrollArea>
    )
}