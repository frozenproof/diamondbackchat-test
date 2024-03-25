import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Channel, OldChannelType } from "@prisma/client";

import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db";
import { MessageInput } from "@/components/display/message/message-input";
import { Suspense } from "react";

interface ChannelIdPageProps {
  // params: {
  //   serverId: string;
  //   channelId: string;
  // };
  serverIdProp: string;
  channelProp: Channel;
}

const ChannelIdPage = async ({
  // params,
  serverIdProp,
  channelProp
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
            {messages.toString()}
          </div>
          <MessageInput
            name={channelProp.name}
            type="direct"
            apiUrl="/api/socket/messages"
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