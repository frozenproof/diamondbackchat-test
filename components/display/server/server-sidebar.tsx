"use server"

import { Member, OldChannelType, OldMemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { ServerHeader } from "@/components/display/server/server-header";
import { ScrollArea } from "../../ui/scroll-area";
import { ServerSearchBar } from "./server-search";
import { Crown, Hash, Magnet, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { ChannelSideBar } from "../channel/channel-sidebar";

const iconMap :{[key: string]: React.ReactNode}= {
    [OldChannelType.TEXT ]: <Hash className="mr-2 h-4 w-4" />,
    [OldChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [OldChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
  };
  
  const roleIconMap :{[key: string]: React.ReactNode}= {
    [OldMemberRole.GUEST]       : null,
    [OldMemberRole.MEMBER]      : <Magnet className="mr-2"/>,
    [OldMemberRole.CREATOR]     : <Crown className="mr-2 text-yellow-200"/>,
    [OldMemberRole.OWNER]       : <Crown className="mr-2 text-blue-200"/>,
    [OldMemberRole.MODERATOR]   : <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
    [OldMemberRole.ADMIN]       : <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
  }
  
interface ServerSideBarProps {
    serverId: string
}

export const ServerSideBar = async({
    serverId
}:ServerSideBarProps) => {
    // console.log("ServerSideBar",serverId)
    const profile = await currentUserProfile();
    if(!profile){
        redirect("/");
    }
    const server2 = await db.server.findUnique({
        where:{
            id:serverId,
            deleted: false
        },
        include:{
            Member:{
                include:{
                    userProfile:true
                },
                orderBy:{
                    role: "asc"
                }
            },
            Channel: {
                where: {
                    deleted: false
                },
                orderBy: {
                    updatedAt: "desc"
                }
            }
        }
    })

    const banned = await db.bannedServerMember.findMany({
        where: {
            serverId: server2?.id
        },
        include: {
            userProfile: true
        }
    })

    if(!server2)
    {
        return redirect("/meself/friend");
    }
    const realChannels = server2.Channel;
    const textChannels = realChannels.filter((channel) => channel.type === OldChannelType.TEXT)
    const audioChannels = realChannels.filter((channel) => channel.type === OldChannelType.AUDIO)
    const videoChannels = realChannels.filter((channel) => channel.type === OldChannelType.VIDEO)
    const Member = server2?.Member
    // .filter((member) => member.userProfileId !== profile.id)
    const thisMember = server2?.Member.find((member) => member.userProfileId === profile.id)
    const role = server2?.Member.find((member) => member.userProfileId === profile.id)?.role
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#ffdbed]">
            <ServerHeader
                server={server2}
                banned={banned}
                member={thisMember as unknown as Member}
            />
        <div
            className="mt-2 ml-1 mr-1 bg-[#f8eeee] "
        >
            <ServerSearchBar 
            userId={profile.id}
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
                data: Member?.map((member) => ({
                    id: member.id,
                    name: member.userProfile.name,
                    icon: roleIconMap[member.role],
                    member: member
                }))
                },
            ]}
            />
            </div>
            <div
                className="h-[8px]"
            >
                
            </div>
            <ScrollArea
                    className="flex-1 px-1"            
                >
                  <ChannelSideBar 
                    serverProp={server2}
                    roleProp={role}
                  />
        </ScrollArea>
        </div>
    )
}