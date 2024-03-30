import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getOrCreateDirectChannel } from "@/lib/direct-search";
import { currentUserProfile } from "@/lib/current-profile";
import { DirectChannelHeader } from "@/components/display/direct/direct-header";
import { DirectChatMessages } from "@/components/display/direct-message/direct-list";
import { MediaRoom } from "@/components/extra/media-room";
import { DirectMessageInput } from "@/components/display/direct-message/direct-input";

interface MemberIdPageProps {
  params: { serverId: string ,memberId: string, },
};

const MemberIdPage = async ({
  params
  // searchParams,
}: MemberIdPageProps) => {
  const profile = await currentUserProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if(!params.memberId || !params.serverId)
  {
    return redirect(`/meself`);
  }

  const requestedMember = await db.member.findFirstOrThrow({
    where: {
      serverId: params.serverId,
      id: params.memberId,
    },
  });

  console.log("Default respond");
  console.log("WUT");
  console.log("The Id",profile.id)
  console.log("Target Id",requestedMember.userProfileId)
  console.log("MemberId",params.memberId)
  console.log("ServerId",params.serverId)
  if (!requestedMember) {
    return redirect("/");
  }

  if(params)
  {
    const direct = await getOrCreateDirectChannel(profile.id, requestedMember.userProfileId);
    console.log(direct?.id)
    if (!direct) {
      return redirect(`/servers`);
    }
    return redirect(`/meself/chat/${direct.id}`);  
  }   
}
 
export default MemberIdPage;