import { OldChannelType, OldMemberRole, Server } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";

import { ScrollArea } from "../ui/scroll-area";

import { Hash, Magnet, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerNavigation } from "../server/server-navigation";
import { ServerChannel } from "../channel/channel-item";
import { MemberItem } from "../member/member-item";
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
  
interface ServerSideBarProps {
    serverProp: ({server: ServerWithMembersWithProfiles})
}

export const ServerSideBar = async({
    serverProp
}:ServerSideBarProps) => {
    const profile = await currentUserProfile();
    if(!profile){
        redirect("/");
    }

    const textChannels = serverProp?.channels.filter((channel) => channel.type === OldChannelType.TEXT)
    const audioChannels = serverProp?.channels.filter((channel) => channel.type === OldChannelType.AUDIO)
    const videoChannels = serverProp?.channels.filter((channel) => channel.type === OldChannelType.VIDEO)
    if(!server)
    {
        return redirect("/");
    }
    const role = server?.members.find((member) => member.userProfileId === profile.id)?.role
    return (

            <ScrollArea
                    className="flex-1 px-1"            
                >
            {!!textChannels?.length && (
              <div className="mb-2">
                <ServerNavigation
                  sectionType="channels"
                  oldChannelType={OldChannelType.TEXT}
                  role={role}
                  label="Text Channels"
                />
                <div className="space-y-[2px]">
                  {textChannels.map((channel) => (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      role={role}
                      server={server}
                    />
                  ))}
                </div>
              </div>
            )}
            {!!audioChannels?.length && (
              <div className="mb-2">
                <ServerNavigation
                  sectionType="channels"
                  oldChannelType={OldChannelType.AUDIO}
                  role={role}
                  label="Voice Channels"
                />
                <div className="space-y-[2px]">
                  {audioChannels.map((channel) => (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      role={role}
                      server={server}
                    />
                  ))}
                </div>
              </div>
            )}
            {!!videoChannels?.length && (
              <div className="mb-2">
                <ServerNavigation
                  sectionType="channels"
                  oldChannelType={OldChannelType.VIDEO}
                  role={role}
                  label="Video Channels"
                />
                <div className="space-y-[2px]">
                  {videoChannels.map((channel) => (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      role={role}
                      server={server}
                    />
                  ))}
                </div>
              </div>
            )}
       </ScrollArea>
    )
}