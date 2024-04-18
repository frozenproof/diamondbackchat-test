"use server"

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile";
import { findFriendsDefault, removeFriend } from "@/lib/friend-lib";
import { NextResponse } from "next/server";

export async function PATCH( 
  req: Request, 
) {
  const profile = await currentUserProfile();
  const { otherUserId } = await req.json();

  if (!profile) {
    return redirectToSignIn();
  }

  if(!otherUserId )
  {
    console.log("how")
    return redirect(`/meself/friend`);
  }

  if(otherUserId)
  {
    const friendRequestSearch = await findFriendsDefault(profile.id, otherUserId);
    // console.log("Friend request found",friendRequestSearch)
    if (friendRequestSearch) {      
      const friendRemove = await removeFriend(friendRequestSearch.id);
      // console.log(friendsCreate)
      return NextResponse.json({statusFriend: "appending",friendRes: friendRemove});
    }
    else if(!friendRequestSearch)
    {
      console.log("Friend Request Failure");
      return NextResponse.json("Friend Request Failure");
    }          
  }  

}

