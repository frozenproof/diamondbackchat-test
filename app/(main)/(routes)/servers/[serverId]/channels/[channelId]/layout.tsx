"use server"

import { db } from "@/lib/db";

import { Metadata, ResolvingMetadata } from "next";

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