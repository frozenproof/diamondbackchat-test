
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
        return redirect("/meself");
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
      return null;
    }

    const otherMember = direct.memberOneId === profile.id ? direct.memberTwo : direct.memberOne;
   
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
  
    if (!otherMember || !multipleDirect)
    {
        return null;
    }
    console.log(otherMember);
    if(direct && otherMember && profile && multipleDirect)
    return ( 
        <div className="channelidpagelayout flex flex-col h-full">
                <DirectChatMemberIdPage 
                    directPageProp={direct}
                    otherMember={otherMember}
                    profilePageProp={profile}
                    multiDirectPageProp={multipleDirect}
                />
        </div>
     );

     return null;
}
 
export default DirectChannelIdPageLayout;