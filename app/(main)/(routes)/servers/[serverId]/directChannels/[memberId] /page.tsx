import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getOrCreateDirectChannel } from "@/lib/direct-search";
import { currentUserProfile } from "@/lib/current-profile";
import { DirectHeader } from "@/components/display/direct/direct-header";
import { DirectChatMessages } from "@/components/display/direct-message/direct-list";
import { MediaRoom } from "@/components/extra/media-room";
import { DirectMessageInput } from "@/components/display/direct-message/direct-input";

interface MemberIdPageProps {
  params: { serverId: string ,memberDICKId: string }
  // searchParams: {
  //   video?: boolean;
  // }
};

const MemberIdPage = async ({
  params
  // searchParams,
}: MemberIdPageProps) => {
  const profile = await currentUserProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if(!params.memberDICKId || !params.serverId)
  {
    return null
  }

  console.log("MemberID",params.memberDICKId);
  const requestedMember = await db.member.findFirstOrThrow({
    where: {
      serverId: params.serverId,
      userProfileId: params.memberDICKId,
    },
  });

  if (!requestedMember) {
    return redirect("/");
  }

  if(!params)
  {
    console.log("WUT");
    return redirect(`/meself`);
  }
  if(params)
  {
    console.log(profile.id,"", requestedMember.userProfileId);
    const direct = await getOrCreateDirectChannel(profile.id, requestedMember.userProfileId);
    if (!direct) {
      return redirect(`/servers`);
    }
    return redirect(`/meself/chat/${direct.id}`);  
  }   
}
 
export default MemberIdPage;