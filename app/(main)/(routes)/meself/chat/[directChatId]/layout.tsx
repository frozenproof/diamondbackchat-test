
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

    const channel = await db.directChannel.findFirstOrThrow({
        where: {
            id: params.directChatId,
            deleted: false
        }
    })

    if( !channel )
    {
        return redirect("/meself/friend");
    }

    const directId = params.directChatId;

    if (!profile) {
      return redirect(`/`);
    }
  
    const direct = await db.directChannel.findFirstOrThrow({
      where: {
        id: directId
      },
      include: {
        memberOne: true,
        memberTwo: true
      }
    });
    if (!direct ) {
      return redirect(`/meself/friend`);
    }

    const multipleDirect = await db.directChannel.findMany({
      where: {
        OR: [
          {memberOneId: profile.id},
          {memberTwoId: profile.id}
        ]
      },
      include: {
        memberOne: true,
        memberTwo: true
      }
    });
    
    if(direct)
    {
      const otherMember = direct.memberOneId === profile.id ? direct.memberTwo : direct.memberOne;
      if (!otherMember || !multipleDirect)
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

    return redirect(`/meself/friend`);

}
 
export default DirectChannelIdPageLayout;