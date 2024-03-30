import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Channel, Member, Message, OldChannelType, UserProfile } from "@prisma/client";

import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db";
import { MessageInput } from "@/components/display/message/message-input";
import { Fragment, Suspense } from "react";
import { MemberWithProfile, MessageWithMemberWithProfile } from "@/type";
import { ChatMessages } from "@/components/display/message/message-list";

import { ChannelHeader } from "@/components/display/channel/channel-header";
import { MediaRoom } from "@/components/extra/media-room";

interface ChannelIdPageProps {
  // params: {
  //   serverId: string;
  //   channelId: string;
  // };
  membersListProp: MemberWithProfile[];
  serverIdProp: string;
  channelProp: Channel;
  memberProp: MemberWithProfile;
}

const ChannelIdPage = async ({
  // params,

  membersListProp,
  serverIdProp,
  channelProp,
  memberProp
}: ChannelIdPageProps) => {
  // const profile = await currentUserProfile();

  // if (!profile) {
  //   return redirectToSignIn();
  // }

  if(!channelProp)
  {
    return null
  }
  // const messages = await db.message.findMany({
  //   where: {
  //     channelId: channelProp.id,
  //   },
  // });
  // if(memberProp)
  // {
  //   console.log("Member prop", memberProp)
  // }
  
  if(channelProp)
  {
    return ( 
    <Suspense>
            <div
              className="w-full inset-y-0"
            >
                <ChannelHeader 
                    serverId={serverIdProp}
                    name={channelProp.name}
                    userAvatar={memberProp.userProfile.imageUrl}
                    userName={memberProp.userProfile.name}
                    userStatusProp={memberProp.userProfile.status}
                    membersList={membersListProp}
                />
            </div>
            {channelProp.type === OldChannelType.TEXT && (
            <>
              
                <ChatMessages
                    memberProp={memberProp}
                    name={channelProp.name}
                    channelChatId={channelProp.id}
                    type="channel"
                    apiUrl="/api/messages/get-api"
                    socketUrl="/api/messages/channel-send"
                    // socketUrl="/api/socket/messages"
                    socketQuery={{
                      channelId: channelProp.id,
                      serverId: serverIdProp,
                    }}
                    paramKey="channelId"
                    paramValue={channelProp.id}
                />
                <MessageInput
                name={channelProp.name}
                type="direct"
                // apiUrl="/api/socket/messages"
                apiUrl="/api/messages/channel-send"
                query={{
                  // channelId: channel.id,
                  channelId: channelProp.id,
                  // serverId: params.serverId,
                  serverId: serverIdProp,
                }}
              />
            </>
          )}
          {channelProp.type === OldChannelType.AUDIO && (
            <MediaRoom
              chatId={channelProp.id}
              video={false}
              audio={true}
            />
          )}
          {channelProp.type === OldChannelType.VIDEO && (
            <MediaRoom
              chatId={channelProp.id}
              video={true}
              audio={true}
            />
          )}    </Suspense>
   );
  }
  
}
 
export default ChannelIdPage;