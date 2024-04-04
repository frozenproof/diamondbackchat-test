"use client"

import { Channel, OldChannelType, OldMemberRole, Server } from "@prisma/client";
import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ServerNavigation } from "../server/server-navigation";
import { ChannelItem } from "../channel/channel-item";

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

    const textChannels  = channelProp?.filter((channel) => channel.type === OldChannelType.TEXT)
    const audioChannels = channelProp?.filter((channel) => channel.type === OldChannelType.AUDIO)
    const videoChannels = channelProp?.filter((channel) => channel.type === OldChannelType.VIDEO)

    if(!serverProp)
    {
        return redirect("/meself/friend");
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