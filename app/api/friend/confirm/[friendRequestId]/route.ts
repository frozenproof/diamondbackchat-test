"use server"

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile";
import { confirmFriendRequest, findFriendsRequest, sendFriendRequest } from "@/lib/friend-lib";
import { NextResponse } from "next/server";

interface MemberIdPageProps {
  params: { friendRequestId: string, },
};

export async function PATCH( 
  req: Request, 
  {params}:MemberIdPageProps,
) {
  const profile = await currentUserProfile();
  const { friendConfirm } = await req.json();

  if (!profile) {
    return redirectToSignIn();
  }

  if(!params.friendRequestId )
  {
    return redirect(`/meself/friend`);
  }

  if(params)
  {
    const friend = await findFriendsRequest(profile.id, params.friendRequestId);
    if (!friend) {      
      const friendsCreate = await confirmFriendRequest(profile.id, params.friendRequestId);
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

