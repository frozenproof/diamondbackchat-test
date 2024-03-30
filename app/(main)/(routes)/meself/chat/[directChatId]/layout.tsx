import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { Metadata, ResolvingMetadata } from "next";
import DirectChatMemberIdPage from "./page";
// import MemberIdPage from "./page";

type Props = {
    params: { directChatId: string }
  }
   
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    
    const channel = await db.directChannel.findUnique
    ({
        where:{
            id: params.directChatId,
        }
    })

    return {
      title: `Euphoria | Direct chat`,
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
    const profile = await currentUserProfile();

    if(!profile){
        return redirectToSignIn();
    }

    const channel = await db.directChannel.findFirstOrThrow({
        where: {
            id: params.directChatId,
            deleted: false
        }
    })

    if( !channel )
    {
        return redirect("/meself");
    }

    return ( 
        <div className="flex flex-col h-full">
                <DirectChatMemberIdPage 
                    params={{directId: params.directChatId}}
                />
        </div>
     );
}
 
export default DirectChannelIdPageLayout;