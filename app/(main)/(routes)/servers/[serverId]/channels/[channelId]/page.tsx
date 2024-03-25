import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Channel, OldChannelType } from "@prisma/client";

import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db";
import { MessageInput } from "@/components/display/message/message-input";

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

  // const channel = await db.channel.findUnique({
  //   where: {
  //     id: params.channelId,
  //   },
  // });

  
  // if (!channel || !member) {
  //   redirect("/meself");
  // }

  console.log("What is this api?",channelProp)

  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        {channelProp.type === OldChannelType.TEXT && (
        <>
          <div
            className="h-full"
          >
            
          </div>
          <MessageInput
            name={channelProp.name}
            type="channel"
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
   );
}
 
export default ChannelIdPage;