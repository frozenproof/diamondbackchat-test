"use server"

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { getOrCreateDirectChannel } from "@/lib/direct-search";
import { currentUserProfile } from "@/lib/current-profile";

interface MemberIdPageProps {
  params: { userProfileId: string, },
};

const MemberIdPage = async ({
  params
  // searchParams,
}: MemberIdPageProps) => {
  const profile = await currentUserProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if(!params.userProfileId )
  {
    return redirect(`/meself/friend`);
  }

  console.log("The Id",profile.id)
  console.log("Target Id",params.userProfileId)

  if(params)
  {
    const direct = await getOrCreateDirectChannel(profile.id, params.userProfileId);
    if (!direct) {
      return redirect(`/meself/friend`);
    }
    else {
      if(typeof direct !== "string")
      return redirect(`/meself/chat/${direct.id}`);  
      return "blocked"
    }    
  }   
}
 
export default MemberIdPage;