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
      title: `Euphoria | `+channel?.name,
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

    if(!members || !channel)
    {
        return redirect("/meself");
    }

    return ( 
        <div className="h-full w-full flex flex-col">
            <ChannelHeader 
                    serverId={params.serverId}
                    name={channel.name}
                    userAvatar={profile.imageUrl}
                    userName={profile.name}
                    userStatusProp={profile.status}
                    membersList={members}
            />
            <div className="h-full border">
                <Suspense>
                {/* {children}     */}
                    <ChannelIdPage 
                        channelProp={channel}
                        serverIdProp={server.id}
                    />
                </Suspense>
            </div>
        </div>
     );
}
 
export default ChannelIdPageLayout;