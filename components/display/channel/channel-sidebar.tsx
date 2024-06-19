"use client"

import { OldChannelType, OldMemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ServerNavigation } from "../server/server-navigation";
import { ChannelItem } from "../channel/channel-item";
import { ServerWithChannels } from "@/type";
import { useEffect, useMemo, useState } from "react";

interface ChannelSideBarProps {
    serverProp:  ServerWithChannels;
    roleProp: OldMemberRole | undefined
}


interface Channel {
  id: string;
  name: string;
  type: OldChannelType;
  updatedAt: Date;
  version: number;
  categories: string;
  deleted: boolean;
  serverId: string;
}

export const ChannelSideBar = ({
    serverProp,
    roleProp
}:ChannelSideBarProps) => {

  const [textChannels, setTextChannels] = useState<Channel[]>([]);
  const [audioChannels, setAudioChannels] = useState<Channel[]>([]);
  const [videoChannels, setVideoChannels] = useState<Channel[]>([]);
  const channelProp = useMemo(() => serverProp.Channel.filter((channel) => !channel.deleted), [serverProp.Channel]);
  useEffect(() => {
      setTextChannels(channelProp.filter((channel) => channel.type === OldChannelType.TEXT));
      setAudioChannels(channelProp.filter((channel) => channel.type === OldChannelType.AUDIO));
      setVideoChannels(channelProp.filter((channel) => channel.type === OldChannelType.VIDEO));
  }, [channelProp]);

  if (!serverProp) {
      return redirect("/meself/friend");
  }

    const role = roleProp;
    {
      // console.log("channel prop is asking",channelProp)
      // console.log("server prop is asking",serverProp)
      return (
        <ScrollArea
                className="flex-1 px-1"            
        >
        {!!textChannels?.length && (
          <div className="mb-2"
            // onClick={() => {alert("WHAT IS GOING ON")}}
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
    
}