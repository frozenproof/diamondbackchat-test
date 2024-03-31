
import { Channel, DirectChannel, OldChannelType, OldMemberRole, Server } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"
import { Hash, Magnet, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import DirectSideBarHeader from "@/components/extra/direct-sidebar-header";
import { DirectChannelItem } from "./direct-item";
import { useEffect } from "react";

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
  
  interface DirectSideBarProps {
    directChannelProp: DirectChannel[],
  }

export const DirectSideBar = async({
  directChannelProp
}: DirectSideBarProps) => {
    const profile = await currentUserProfile();
    if(!profile){
        redirect("/");
    }

    // console.log("This is main direct",directChannelProp)
    return (
      <div>
        <DirectSideBarHeader 
        />
        {!!directChannelProp?.length && (
              <div className="mb-2">
                <div className="space-y-[2px]">
                  {directChannelProp.map((channel) => 
                  {
                    return (
                    <DirectChannelItem
                      key={channel.id}
                      directChannelProp={channel}
                      nameProp={""}
                      avatar={""}
                    />)
                    })}
                </div>
              </div>
            )}
      </div>
    )
}