
import { Channel, OldChannelType, OldMemberRole, Server } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Hash, Magnet, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerNavigation } from "../server/server-navigation";

import { MemberItem } from "../member/member-item";
import { ServerWithMembersWithProfiles } from "@/type";
import { DirectChannelHeader } from "./direct-header";
import DirectSideBarHeader from "@/components/extra/direct-sidebar-header";

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
  
export const DirectSideBar = async({
}) => {
    const profile = await currentUserProfile();
    if(!profile){
        redirect("/");
    }

    return (
      <div>
        <DirectSideBarHeader 

        />
        <ScrollArea
                className="flex-1 px-1"            
            >
              
        </ScrollArea>
      </div>
    )
}