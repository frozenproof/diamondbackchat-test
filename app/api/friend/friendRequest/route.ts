"use server"

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile";
import { findFriendsDefault, sendFriendRequest } from "@/lib/friend-lib";
import { NextResponse } from "next/server";

export async function PATCH( 
  req: Request, 
) {
  const profile = await currentUserProfile();
  const { userProfileId } = await req.json();
  if (!profile) {
    return redirectToSignIn();
  }

  if(!userProfileId )
  {
    return redirect(`/meself/friend`);
  }

  console.log("The Id",profile.id)
  console.log("Target Id",userProfileId)

  if(userProfileId)
  {
    const friend = await findFriendsDefault(profile.id, userProfileId);
    if (!friend) {      
      const friendsCreate = await sendFriendRequest(profile.id, userProfileId);
      // console.log(friendsCreate)
      return NextResponse.json({statusFriend: "appending",friendRes: friendsCreate});
    }
    else if(friend)
    {
      console.log("Friend Request",friend);
      return NextResponse.json(friend);
    }          
  }  
  else if(!userProfileId) {
    console.log("Failure: No user detected")
  }
}

