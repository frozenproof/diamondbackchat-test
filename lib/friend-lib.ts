// "use server"
//run on server but is a server function , not to be confused with server action
import { db } from "@/lib/db";
import { currentUserProfile } from "./current-profile";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const findFriendsDefault = async () => {
  try {
    const profile = await currentUserProfile();
    if(!profile)
    {
      return redirect(`/`)
    }
    const friends = await db.friend.findMany(
      {
        where: {
          OR: [
            {friendOneId: profile.id},
            {friendTwoId: profile.id}
          ],
          pending: false
        }
      }
    )

    if(friends)
    {
      console.log(friends);
      return NextResponse.json(friends);
    }
  
  } catch {
    return null;
  }
}

export const sendFriendRequest = async (otherFriendId: string) => {
  try {
    const profile = await currentUserProfile();
    if(!profile)
    {
      return redirect(`/`)
    }
    const friends = await db.friend.findMany(
      {
        where: {
          OR: [
            {friendOneId: profile.id},
            {friendTwoId: profile.id}
          ],
          pending: false
        }
      }
    )

    if(friends)
    {
      console.log(friends);
      return NextResponse.json(friends);
    }
  
  } catch {
    return null;
  }
}