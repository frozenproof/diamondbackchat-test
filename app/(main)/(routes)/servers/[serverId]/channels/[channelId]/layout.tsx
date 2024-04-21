"use server"

import { db } from "@/lib/db";

import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

type Props = {
    params: { serverId: string ,channelId: string }
}
   
export async function generateMetadata(
    { params }: Props  ): Promise<Metadata> {
    
    const channel = await db.channel.findUnique
    ({
        where:{
            id: params.channelId,
        }
    })

    if(!channel)
    {
        return redirect(`/meself/friend`)
    }
    return {
      title: `LilTrees | `+channel?.name,
    }
}


const ChannelIdPageLayout = async ({
    children
    }:
    {
        children: React.ReactNode;
    }
) => {

    
    return ( 
        <div className="channelidpagelayout flex flex-col h-full">
            {children}   
        </div>
     );
}
 
export default ChannelIdPageLayout;