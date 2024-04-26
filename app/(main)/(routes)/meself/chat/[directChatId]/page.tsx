"use server"

import { DirectChannelHeader } from "@/components/display/direct/direct-header";
import { DirectChatMessages } from "@/components/display/direct-message/direct-list";

import { DirectMessageInput } from "@/components/display/direct-message/direct-input";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

type DirectMemberIdPageProps = {
  params: { directChatId: string }
}
const DirectChatMemberIdPage = async ({
    params
  }: DirectMemberIdPageProps) => {

    const profile = await currentUserProfile();

    if(!profile){
        return redirect(`/`);
    }

    const direct = await db.directChannel.findFirst({
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
        <Suspense
          fallback={
            <div>
              Loading
            </div>
          }
        >
          <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <DirectChannelHeader
              imageUrl={otherMember.imageUrl}
              name={otherMember.name}
              directChannelHeaderIdProp={direct.id}
              userProfileProp={profile}
              otherUserIdSocket={otherMember.id}
            />
            <>
                <DirectChatMessages
                  currentMemberProp={profile}
                  name={otherMember.name}
                  directChatId={direct.id}
                  type="direct"
                  apiUrl="/api/messages/direct-get-api"
                  paramKey="directChannelId"
                  paramValue={direct.id}
                  socketUrl="/api/messages"
                  socketQuery={{
                    channelId: direct.id,
                  }}
                />
                <DirectMessageInput
                  memberIdPropInput={otherMember.id}
                  channelName={otherMember.name}
                  apiUrl="/api/messages/direct-channel-send"
                  query={{
                    channelId: direct.id,
                  }}
                />
              </>
          </div>
        </Suspense>
      );
  }
}
 
export default DirectChatMemberIdPage;