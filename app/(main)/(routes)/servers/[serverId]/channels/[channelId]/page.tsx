import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Channel, Member, Message, OldChannelType } from "@prisma/client";

import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db";
import { MessageInput } from "@/components/display/message/message-input";
import { Fragment, Suspense } from "react";
import { MessageWithMemberWithProfile } from "@/type";
import { ChatMessages } from "@/components/display/message/message-list";
import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar";

interface ChannelIdPageProps {
  // params: {
  //   serverId: string;
  //   channelId: string;
  // };
  serverIdProp: string;
  channelProp: Channel;
  memberProp: Member;
}

const ChannelIdPage = async ({
  // params,
  serverIdProp,
  channelProp,
  memberProp
}: ChannelIdPageProps) => {
  const profile = await currentUserProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if(!channelProp)
  {
    return null
  }
  const messages = await db.message.findMany({
    where: {
      channelId: channelProp.id,
    },
  });

  
  if(channelProp)
  {
    return ( 
    <Suspense>
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        {channelProp.type === OldChannelType.TEXT && (
        <>
          <div
            className="h-full"
          >
            {/* Is this running? */}
            <ChatMessages
                member={memberProp}
                name={channelProp.name}
                chatId={channelProp.id}
                type="channel"
                apiUrl="/api/messages/get-api"
                socketUrl="/api/socket/messages"
                socketQuery={{
                  channelId: channelProp.id,
                  serverId: serverIdProp,
                }}
                paramKey="channelId"
                paramValue={channelProp.id}
            />
            {/* {messages.map((group, i) => (
              <Fragment key={i}>
                {messages.map((message: Message) => (
                  <div key={message.id}>
                    <UserProfileAvatar 
                      src={message.userProfileId}
                    />
                    {message.content} + {i}
                  </div>
                ))}
              </Fragment>
            ))} */}
          </div>
          <MessageInput
            name={channelProp.name}
            type="direct"
            // apiUrl="/api/socket/messages"
            apiUrl="/api/messagePost"
            query={{
              // channelId: channel.id,
              channelId: channelProp.id,
              // serverId: params.serverId,
              serverId: serverIdProp,
            }}
          />
        </>
      )}
    </div>
    </Suspense>
   );
  }
  
}
 
export default ChannelIdPage;