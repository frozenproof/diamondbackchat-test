"use server"

import { ChannelHeader } from "@/components/display/channel/channel-header";
import { MessageInput } from "@/components/display/message/message-input";
import { ChatMessagesList } from "@/components/display/message/message-list";
import { MediaRoom } from "@/components/livekit-call-room";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { OldChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { Suspense, createContext, useState } from "react";

const messageIdContext = createContext;

const ChannelIdPage = async ({
  params,
}: {    params: {serverId: string,channelId: string}
}) => {
  try
  {
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
                    userProfileProp={profile}
                    membersList={members}
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
                memberListProp={members}
              />
            </>
            )}
            {channel.type === OldChannelType.AUDIO && (
                <MediaRoom
                chatId={channel.id}
                video={false}
                audio={true}
                userIdProp={member.nickname}
                />
            )}
            {channel.type === OldChannelType.VIDEO && (
                <MediaRoom
                chatId={channel.id}
                video={true}
                audio={true}
                userIdProp={member.nickname}
                />
            )}
        </Suspense>
    );
  }   
  catch(e)
  {
    console.log("ChannelIdPageRenderError",e);
    return redirect("/meself/friend");
  }  
}
 
export default ChannelIdPage;