"use server"

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile";
import { confirmFriendRequest, findFriendsRequest } from "@/lib/friend-lib";
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
    console.log("how")
    return redirect(`/meself/friend`);
  }

  if(params)
  {
    const friendRequestSearch = await findFriendsRequest(profile.id, params.friendRequestId);
    // console.log("Friend request found",friendRequestSearch)
    if (friendRequestSearch) {      
      const friendsCreate = await confirmFriendRequest(profile.id, params.friendRequestId, friendConfirm);
      // console.log(friendsCreate)
      return NextResponse.json({statusFriend: "appending",friendRes: friendsCreate});
    }
    else if(!friendRequestSearch)
    {
      console.log("Friend Request Failure");
      return NextResponse.json("Friend Request Failure");
    }          
  }  
  else if(!params) {
    console.log("no friends detected")
  }
}

