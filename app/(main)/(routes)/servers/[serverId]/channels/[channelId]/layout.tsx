"use server"

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ServerSideBar } from "@/components/display/server/server-sidebar";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { UserButtonDiamond } from "@/components/uihelper/user-button-diamond";

import { Metadata, ResolvingMetadata } from "next";
import { ChannelHeader } from "@/components/display/channel/channel-header";
import ChannelIdPage from "./page";
import { Suspense } from "react";
import { LoadingMainPage } from "@/components/uihelper/loading-wait";
import { MessageInput } from "@/components/display/message/message-input";
import { ChatMessagesList } from "@/components/display/message/message-list";
import { OldChannelType } from "@prisma/client";

type Props = {
    params: { serverId: string ,channelId: string }
  }
   
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    
    const channel = await db.channel.findUnique
    ({
        where:{
            id: params.channelId,
        }
    })

    return {
      title: `LilTrees | `+channel?.name,
    }
}


const ChannelIdPageLayout = async ({
    children,
    params}:
    {
        children: React.ReactNode;
        params: {serverId: string,channelId: string}
    }
) => {
    const profile = await currentUserProfile();

    if(!profile){
        return redirectToSignIn();
    }

    const server = await db.server.findUnique
    ({
        where:{
            id: params.serverId,
            Member:{
                some:{
                    userProfileId: profile.id,
                }
            },
            deleted: false
        }
    })

    if(!server)
    {
        return redirect("/meself");
    }
    
    const channel = await db.channel.findFirstOrThrow({
        where: {
            id: params.channelId,
            deleted: false
        }
    })

    const members = await db.member.findMany({
        where:{
            serverId: 
                params.serverId,
            userProfileId: profile.id
        },
        include: {
            userProfile: true
        }
    })

    const member = await db.member.findFirstOrThrow({
        where: {
            userProfileId: profile.id
        },
        include: {
            userProfile: true
        }
    })
    if(!members || !channel || !member)
    {
        return redirect("/meself");
    }
    // if(member)
    return ( 
        <div className="channelidpagelayout flex flex-col h-full">

                <ChannelIdPage 
                    membersListProp={members}
                    memberProp={member}
                    channelProp={channel}
                    serverIdProp={server.id}
                />

        </div>
     );
}
 
export default ChannelIdPageLayout;