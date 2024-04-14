"use server"

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile";
import { findFriendsDefault, sendFriendRequest } from "@/lib/friend-lib";
import { NextResponse } from "next/server";

interface MemberIdPageProps {
  params: { userProfileId: string, },
};

export async function PATCH( 
  req: Request, 
  {params}:MemberIdPageProps,
) {
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
    const friend = await findFriendsDefault(profile.id, params.userProfileId);
    if (!friend) {      
      const friendsCreate = await sendFriendRequest(profile.id, params.userProfileId);
      // console.log(friendsCreate)
      return NextResponse.json({statusFriend: "appending",friendRes: friendsCreate});
    }
    else if(friend)
    {
      console.log("Friend Request",friend);
      return NextResponse.json(friend);
    }          
  }  
  else if(!params) {
    console.log("no friends detected")
  }
}

