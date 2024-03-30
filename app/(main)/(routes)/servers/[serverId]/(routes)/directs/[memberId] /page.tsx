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
  params: { serverId: string ,memberId: string }
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

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userProfileId: profile.id,
    },
    include: {
      userProfile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  if(!params)
  {
    console.log("WUT");
    return null;
  }
  if(params)
  {
    // console.log("currentMember",currentMember.userProfileId)
    // console.log("memberDIRECTID",params.memberId);
    const direct = await getOrCreateDirectChannel(currentMember.userProfileId, currentMember.userProfileId);
  
    if (!direct) {
      return redirect(`/servers/${params.serverId}/`);
    }
    return  redirect(`/meself/chat/${direct.id}`);  }   
}
 
export default MemberIdPage;