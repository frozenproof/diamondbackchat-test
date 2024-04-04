
import { redirect } from "next/navigation";


import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { Metadata, ResolvingMetadata } from "next";
// import MemberIdPage from "./page";

type DirectMemberIdPageProps = {
  params: { directChatId: string }
}
   
export async function generateMetadata(
    { params }: DirectMemberIdPageProps,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    
    const channel = await db.directChannel.findUnique
    ({
        where:{
            id: params.directChatId,
        }
    })

    return {
      title: `LilTrees | Direct chat`,
    }
}


const DirectChannelIdPageLayout = async ({
    children,
    params}:
    {
        children: React.ReactNode;
        params: { directChatId: string}
    }
) => {


    return ( 
      <div className="channelidpagelayout flex flex-col h-full">
        {children}
      </div>
   );
}
 
export default DirectChannelIdPageLayout;