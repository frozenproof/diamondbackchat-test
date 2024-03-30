import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { Metadata, ResolvingMetadata } from "next";
import ChannelIdPage from "./page";
import MemberIdPage from "./page";

type Props = {
    params: { directId: string }
  }
   
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    
    const channel = await db.directChannel.findUnique
    ({
        where:{
            id: params.directId,
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
        params: { directId: string}
    }
) => {
    const profile = await currentUserProfile();

    if(!profile){
        return redirectToSignIn();
    }

    const channel = await db.directChannel.findFirstOrThrow({
        where: {
            id: params.directId,
            deleted: false
        }
    })

    if( !channel )
    {
        return redirect("/meself");
    }

    return ( 
        <div className="flex flex-col h-full">
                <MemberIdPage 
                    params={{directId: params.directId}}
                />
        </div>
     );
}
 
export default DirectChannelIdPageLayout;