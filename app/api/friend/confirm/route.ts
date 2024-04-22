"use server"

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile";
import { confirmFriendRequest, findFriendsRequest } from "@/lib/friend-lib";
import { NextResponse } from "next/server";

export async function PATCH( 
  req: Request, 
) {
  const profile = await currentUserProfile();
  const { friendRequestId,friendConfirm } = await req.json();

  if (!profile) {
    return redirectToSignIn();
  }

  if(!friendRequestId )
  {
    console.log("how")
    return redirect(`/meself/friend`);
  }

  if(friendRequestId)
  {
    const friendRequestSearch = await findFriendsRequest(profile.id, friendRequestId);
    // console.log("Friend request found",friendRequestSearch)
    if (friendRequestSearch) {      
      const friendsCreate = await confirmFriendRequest(profile.id, friendRequestId, friendConfirm);
      // console.log(friendsCreate)
      return NextResponse.json({statusFriend: "appending",friendRes: friendsCreate});
    }
    else if(!friendRequestSearch)
    {
      console.log("Friend Request Failure");
      return NextResponse.json("Friend Request Failure");
    }          
  }  
  else if(!friendRequestId) {
    console.log("no friends detected")
  }
}

