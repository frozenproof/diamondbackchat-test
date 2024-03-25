import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { OldChannelType } from "@prisma/client";

import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db";

interface DirectChatHandlerProps {
  params: {
    serverId: string;
    channelId: string;
  }
}

const DirectChatHandler = async ({
  params
}: DirectChatHandlerProps) => {
  const profile = await currentUserProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userProfileId: profile.id,
    }
  });

  if (!channel || !member) {
    redirect("/meself");
  }

  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        This is channel page test
    </div>
   );
}
 
export default DirectChatHandler;