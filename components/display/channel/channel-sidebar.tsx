"use client"

import { OldChannelType, OldMemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ServerNavigation } from "../server/server-navigation";
import { ChannelItem } from "../channel/channel-item";
import { ServerWithChannels } from "@/type";
import { useEffect } from "react";

interface ChannelSideBarProps {
    serverProp:  ServerWithChannels;
    roleProp: OldMemberRole | undefined
}

export const ChannelSideBar = async({
    serverProp,
    roleProp
}:ChannelSideBarProps) => {

    const channelProp = serverProp.Channel.filter((channel) => channel.deleted === false);
    let textChannels  = channelProp?.filter((channel) => channel.type === OldChannelType.TEXT)
    let audioChannels = channelProp?.filter((channel) => channel.type === OldChannelType.AUDIO)
    let videoChannels = channelProp?.filter((channel) => channel.type === OldChannelType.VIDEO)

    if(!serverProp)
    {
        return redirect("/meself/friend");
    }
    useEffect(() => {
      (async () => {
        textChannels = channelProp?.filter((channel) => channel.type === OldChannelType.TEXT)
        audioChannels = channelProp?.filter((channel) => channel.type === OldChannelType.AUDIO)
        videoChannels = channelProp?.filter((channel) => channel.type === OldChannelType.VIDEO)
      })();
    }, [channelProp,serverProp]);
    const role = roleProp;
    if(channelProp)
    return (

            <ScrollArea
                    className="flex-1 px-1"            
            >
            {!!textChannels?.length && (
              <div className="mb-2"
                // onClick={() => {alert("WHAT THE FUCK IS GOING ON")}}
              >
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