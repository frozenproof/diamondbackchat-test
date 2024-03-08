import { OldChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { ServerHeader } from "@/components/server/server-header";
import { UserButtonDiamond } from "../uihelper/user-button-diamond";

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
        },
        include:{
            channels:{
                orderBy:{
                    createdAt: "asc"
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
        <div className="flex  h-full text-primary w-full dark:bg-[#2b2d31] bg-[#2fffb3]">
            <ServerHeader
                server={server}
                role={role}
            />
        </div>
    )
}