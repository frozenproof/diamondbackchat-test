import { Channel, OldChannelType, OldMemberRole, Server } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"

import { ScrollArea } from "@/components/ui/scroll-area";

import { Hash, Magnet, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerNavigation } from "../server/server-navigation";
import { ChannelItem } from "../channel/channel-item";

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
  
interface ChannelSideBarProps {
    serverProp: Server,
    channelProp: Channel[],
    roleProp: OldMemberRole | undefined
}

export const ChannelSideBar = async({
    serverProp,
    channelProp,
    roleProp
}:ChannelSideBarProps) => {
    const profile = await currentUserProfile();
    if(!profile){
        redirect("/");
    }

    const textChannels  = channelProp?.filter((channel) => channel.type === OldChannelType.TEXT)
    const audioChannels = channelProp?.filter((channel) => channel.type === OldChannelType.AUDIO)
    const videoChannels = channelProp?.filter((channel) => channel.type === OldChannelType.VIDEO)

    if(!serverProp)
    {
        return redirect("/");
    }
    const role = roleProp;
    return (

            <ScrollArea
                    className="flex-1 px-1"            
                >
            {!!textChannels?.length && (
              <div className="mb-2">
                {/* <ServerNavigation
                  sectionType="channels"
                  oldChannelType={OldChannelType.TEXT}
                  role={role}
                  label="Text Channels"
                /> */}
                <div className="space-y-[2px]">
                  {textChannels.map((channel) => (
                    <ChannelItem
                      key={channel.id}
                      channel={channel}
                      role={role}
                      server={serverProp}
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
                    <ChannelItem
                      key={channel.id}
                      channel={channel}
                      role={role}
                      server={serverProp}
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
                    <ChannelItem
                      key={channel.id}
                      channel={channel}
                      role={role}
                      server={serverProp}
                    />
                  ))}
                </div>
              </div>
            )}
       </ScrollArea>
    )
}