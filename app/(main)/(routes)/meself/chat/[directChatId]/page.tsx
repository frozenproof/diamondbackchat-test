import { DirectChannelHeader } from "@/components/display/direct/direct-header";
import { DirectChatMessages } from "@/components/display/direct-message/direct-list";

import { DirectMessageInput } from "@/components/display/direct-message/direct-input";
import { DirectChannel, UserProfile } from "@prisma/client";
import { DirectChannelWithProfile } from "@/type";

interface MemberIdPageProps {
    otherMember: UserProfile;
    directPageProp: DirectChannel ;
    multiDirectPageProp: DirectChannelWithProfile[];
    profilePageProp: UserProfile;
}

const DirectChatMemberIdPage = async ({
  directPageProp,
  otherMember,
  profilePageProp,
  multiDirectPageProp
}: MemberIdPageProps) => {

  console.log("DirectChatMemberIdPage");
  if(otherMember)
  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <DirectChannelHeader
        imageUrl={otherMember.imageUrl}
        name={otherMember.name}
        userAvatarProp={profilePageProp.imageUrl}
        userNameProp={profilePageProp.name}
        userStatusProp={profilePageProp.status}
        userProfileIdProp={profilePageProp.id}
      />
      <>
          <DirectChatMessages
            currentMemberProp={profilePageProp}
            name={otherMember.name}
            directChatId={directPageProp.id}
            type="direct"
            apiUrl="/api/messages/direct-get-api"
            paramKey="directChannelId"
            paramValue={directPageProp.id}
            socketUrl="/api/messages"
            socketQuery={{
              channelId: directPageProp.id,
            }}
          />
          <DirectMessageInput
            memberIdProp={directPageProp.id}
            channelName={otherMember.name}
            apiUrl="/api/messages/direct-channel-send"
            query={{
              directChatId: directPageProp.id,
            }}
          />
        </>
    </div>
   );
}
 
export default DirectChatMemberIdPage;