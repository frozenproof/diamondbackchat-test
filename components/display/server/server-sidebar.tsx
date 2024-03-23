import { OldChannelType, OldMemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { ServerHeader } from "@/components/display/server/server-header";
import { UserButtonDiamond } from "../../uihelper/user-button-diamond";
import { ScrollArea } from "../../ui/scroll-area";
import { ServerSearchBar } from "./server-search";
import { Hash, Magnet, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerNavigation } from "./server-navigation";
import { ServerChannel } from "../channel/channel-item";
import { MemberItem } from "../member/member-item";
import { ChannelSideBar } from "../channel/channel-sidebar";
import { MemberSideBar } from "../member/member-sidebar";

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
    serverId: string
}

export const ServerSideBar = async({
    serverId
}:ServerSideBarProps) => {
    const profile = await currentUserProfile();
    if(!profile){
        redirect("/");
    }
    const server = await db.server.findUnique({
        where:{
            id:serverId,
            deleted: false
        },
        include:{
            channels:{
                orderBy:{
                    createdAt: "asc"
                },
                where:{
                  // deleted: false
                }
            },
            members:{
                include:{
                    userProfile:true
                },
                orderBy:{
                    role: "asc"
                }
            }
        }
    })
    const textChannels = server?.channels.filter((channel) => channel.type === OldChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === OldChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === OldChannelType.VIDEO)
    const members = server?.members.filter((member) => member.userProfileId !== profile.id)
    if(!server)
    {
        return redirect("/");
    }
    const role = server?.members.find((member) => member.userProfileId === profile.id)?.role
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#2fffb3]">
            <ServerHeader
                server={server}
                role={role}
            />
        <div
            className="mt-2 ml-1 mr-1 bg-[#f8eeee]"
        >
            <ServerSearchBar 
            data={[
                {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                }))
                },
                {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                }))
                },
                {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                }))
                },
                {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                    id: member.id,
                    name: member.userProfile.name,
                    icon: roleIconMap[member.role],
                }))
                },
            ]}
            />
            </div>
            <ScrollArea
                    className="flex-1 px-1"            
                >
                  <ChannelSideBar 
                    serverProp={server}
                    channelProp={server.channels}
                    roleProp={role}
                  />
                  <MemberSideBar 
                    serverProp={server}
                      roleProp={role}
                  />
        </ScrollArea>
        </div>
    )
}