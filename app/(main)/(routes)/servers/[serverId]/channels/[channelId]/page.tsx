"use server"

import { Channel, OldChannelType } from "@prisma/client";

import { MessageInput } from "@/components/display/message/message-input";
import { Suspense } from "react";
import { MemberWithProfile} from "@/type";
import { ChatMessagesList } from "@/components/display/message/message-list";

import { ChannelHeader } from "@/components/display/channel/channel-header";
import { MediaRoom } from "@/components/livekit-call-room";

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
  if(!channelProp || !memberProp)
  {
    return null
  }
  
  if(channelProp && memberProp)
  {
    console.log("ChannelIdPage",memberProp.id)
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
                    userProfileIdProp={memberProp.userProfile.id}
                />
            </div>
            {channelProp.type === OldChannelType.TEXT && (
            <>
              
                <ChatMessagesList
                    memberProp={memberProp}
                    name={channelProp.name}
                    channelChatId={channelProp.id}
                    type="channel"
                    apiUrl="/api/messages/get-api"
                    socketUrl="/api/messages"
                    // socketUrl="/api/socket/messages"
                    socketQuery={{
                      channelId: channelProp.id,
                      serverId: serverIdProp,
                    }}
                    paramKey="channelId"
                    paramValue={channelProp.id}
                />
                <MessageInput
                // apiUrl="/api/socket/messages"
                apiUrl="/api/messages/channel-send"
                channelName={channelProp.name}
                memberIdProp={memberProp.id}
                query={{
                  channelId: channelProp.id,
                  // serverId: params.serverId,
                  serverId: serverIdProp,
                }}
              />
            </>
          )}
          {channelProp.type === OldChannelType.VIDEO && (
            <MediaRoom
              chatId={channelProp.id}
              video={false}
              audio={true}
              userIdProp={memberProp.id}
            />
          )}
          {/* {channelProp.type === OldChannelType.VIDEO && (
            <MediaRoom
              chatId={channelProp.id}
              video={true}
              audio={true}
              userIdProp={memberProp.id}
            />
          )}     */}
          </Suspense>
   );
  }
  
}
 
export default ChannelIdPage;