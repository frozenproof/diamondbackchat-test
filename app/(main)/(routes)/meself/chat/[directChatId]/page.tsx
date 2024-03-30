import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getOrCreateDirectChannel } from "@/lib/direct-search";
import { currentUserProfile } from "@/lib/current-profile";
import { DirectHeader } from "@/components/display/direct/direct-header";
import { DirectChatMessages } from "@/components/display/direct-message/direct-list";
import { MediaRoom } from "@/components/extra/media-room";
import { DirectMessageInput } from "@/components/display/direct-message/direct-input";

interface MemberIdPageProps {
  params: {
    directId: string
  },
}

const DirectMemberIdPage = async ({
  params,
}: MemberIdPageProps) => {
  const profile = await currentUserProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const direct = await db.directChannel.findFirstOrThrow({
    where: {
      id: params.directId
    },
    include: {
      memberOne: true,
      memberTwo: true
    }
  });

  if (!direct) {
    return redirect(`/meself`);
  }

  // console.log("currentUSERID",profile.id)
  // console.log("memberone",direct.memberOne.id);
  // console.log("membertwo",direct.memberTwo.id);
  const otherMember = direct.memberOneId === profile.id ? direct.memberOne : direct.memberTwo;

  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <DirectHeader
        imageUrl={otherMember.imageUrl}
        name={otherMember.name}
      />
      {/* {searchParams.video && (
        <MediaRoom
          chatId={direct.id}
          video={true}
          audio={true}
        />
      )} */}
      {/* {!searchParams.video && (
        <>
          <DirectChatMessages
            currentMemberProp={profile}
            name={otherMember.name}
            directChatId={direct.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={direct.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: direct.id,
            }}
          />
          <DirectMessageInput
            name={otherMember.name}
            apiUrl="/api/messages/direct-channel-send"
            query={{
              conversationId: direct.id,
            }}
          />
        </>
      )} */}
    </div>
   );
}
 
export default DirectMemberIdPage;