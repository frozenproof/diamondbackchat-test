
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
    const profile = await currentUserProfile();

    if(!profile){
        return redirect(`/`);
    }

    const direct = await db.directChannel.findFirstOrThrow({
      where: {
        id: params.directChatId,
      },
      include: {
        memberOne: true,
        memberTwo: true
      }
    });
    if (!direct ) {
      return redirect(`/meself/friend`);
    }
 
    if(direct)
    {
      const otherMember = direct.memberOneId === profile.id ? direct.memberTwo : direct.memberOne;
      if (!otherMember)
      {
          return redirect(`/meself/friend`);
      }

      if(otherMember)
      return ( 
          <div className="channelidpagelayout flex flex-col h-full">
            <DirectChatMemberIdPage 
                directPageProp={direct}
                otherMember={otherMember}
                profilePageProp={profile}
            />
          </div>
       );
    }
}
 
export default DirectChannelIdPageLayout;