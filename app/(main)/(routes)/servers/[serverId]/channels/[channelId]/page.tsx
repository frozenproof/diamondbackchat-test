"use server"

import { Channel, OldChannelType } from "@prisma/client";

import { MessageInput } from "@/components/display/message/message-input";
import { Suspense } from "react";
import { MemberWithProfile} from "@/type";
import { ChatMessagesList } from "@/components/display/message/message-list";

import { ChannelHeader } from "@/components/display/channel/channel-header";
import {MediaRoom} from "@/components/livekit-call-room";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUserProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

const ChannelIdPage = async ({
  params,
}: {    params: {serverId: string,channelId: string}
}) => {
  const profile = await currentUserProfile();

  if(!profile){
      return redirectToSignIn();
  }

  const server = await db.server.findUnique
  ({
      where:{
          id: params.serverId,
          Member:{
              some:{
                  userProfileId: profile.id,
              }
          },
          deleted: false
      }
  })

  if(!server)
  {
      return redirect("/meself/friend");
  }
  
  const channel = await db.channel.findFirstOrThrow({
      where: {
          id: params.channelId,
          deleted: false
      }
  })

  const members = await db.member.findMany({
      where:{
          serverId: params.serverId,
      },
      include: {
          userProfile: true
      }
  })

  const member = await db.member.findFirstOrThrow({
      where: {
          userProfileId: profile.id
      },
      include: {
          userProfile: true
      }
  })
  if(!members || !channel || !member)
  {
      return redirect("/meself/friend");
  }
  
    // console.log("ChannelIdPage",memberProp.id)
    return ( 
        <Suspense
            fallback={
                <div>
                    Loading channel page
                </div>
            }
        >
            <div
              className="w-full inset-y-0 max-h-full"
            >
                <ChannelHeader 
                    serverId={server.id}
                    name={channel.name}
                    userAvatar={profile.imageUrl}
                    userName={profile.name}
                    userStatusProp={profile.status}
                    membersList={members}
                    userProfileIdProp={profile.id}
                />
            </div>
            {channel.type === OldChannelType.TEXT && (
            <>              
                <ChatMessagesList
                    memberProp={member}
                    name={channel.name}
                    channelChatId={channel.id}
                    type="channel"
                    apiUrl="/api/messages/get-api"
                    socketUrl="/api/messages"
                    // socketUrl="/api/socket/messages"
                    socketQuery={{
                      channelId: channel.id,
                      serverId: server.id,
                    }}
                    paramKey="channelId"
                    paramValue={channel.id}
                />
                <MessageInput
                // apiUrl="/api/socket/messages"
                apiUrl="/api/messages/channel-send"
                channelName={channel.name}
                memberIdProp={member.id}
                query={{
                  channelId: channel.id,
                  // serverId: params.serverId,
                  serverId: server.id,
                }}
              />
            </>
            )}
            {channel.type === OldChannelType.VIDEO && (
                <MediaRoom
                chatId={channel.id}
                video={false}
                audio={true}
                userIdProp={member.nickname}
                />
            )}
        </Suspense>
    );
  }
  
 
export default ChannelIdPage;