import { Channel, Member, OldChannelType, OldMemberRole, Server, UserProfile } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";

import { ScrollArea } from "../ui/scroll-area";

import { Hash, Magnet, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerNavigation } from "@/components/display/server/server-navigation";
import { ServerChannel } from "@/components/display/channel/channel-item";
import { MemberItem } from "@/components/display/member/member-item";
import { ServerWithMembersWithProfiles } from "@/type";

const iconMap :{[key: string]: React.ReactNode}= {
    [OldChannelType.TEXT ]: <Hash className="mr-2 h-4 w-4" />,
    [OldChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [OldChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
  };
  
  const roleIconMap :{[key: string]: React.ReactNode}= {
    [OldMemberRole.GUEST]       : null,
    [OldMemberRole.MEMBER]      : <Magnet className="mr-2"/>,
    [OldMemberRole.MODERATOR]   : <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
    [OldMemberRole.ADMIN]       : <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
  }
  
interface MemberSideBarProps {
    serverProp: ServerWithMembersWithProfiles,
    roleProp: OldMemberRole | undefined
}

export const MemberSideBar = async({
    serverProp,
    roleProp
}:MemberSideBarProps) => {
    const profile = await currentUserProfile();
    if(!profile){
        return redirect("/");
    }

    if(!serverProp)
    {
        return redirect("/");
    }
    const role = roleProp;
    return (

            <ScrollArea
                    className="flex-1 px-1"            
                >
                {!!serverProp?.members.length && (
                <div className="mb-2">
                    <ServerNavigation
                    sectionType="members"
                    role={role}
                    label="Members"
                    server={serverProp}
                    />
                    <div className="space-y-[2px]">
                    {serverProp?.members.map((member) => (
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