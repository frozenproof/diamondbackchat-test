// "use server"
//run on server but is a server function , not to be confused with server action
import { db } from "@/lib/db";
import { currentUserProfile } from "./current-profile";
import { redirect } from "next/navigation";

export const findFriendsDefault = async (currentUserId: string, otherUserId: string) => {
  try {
    const friends = await db.friend.findFirst(
      {
        where: {
          OR: [
            {friendOneId: currentUserId,friendTwoId: otherUserId},
            {friendTwoId: currentUserId,friendOneId: otherUserId}
          ],
          pending: false,
        }
      }
    )

    if(friends)
    {
      console.log(friends);
      return (friends);
    }
  
  } catch {
    return null;
  }
}

export const sendFriendRequest = async (currentUserId: string, otherUserId: string) => {
  try {
    const profile = await currentUserProfile();
    if(!profile)
    {
      return redirect(`/`)
    }

    const friends = await db.friend.findFirst(
      {
        where: {
          OR: [
            {friendOneId: currentUserId,friendTwoId: otherUserId},
            {friendTwoId: currentUserId,friendOneId: otherUserId},            
          ],
          AND: {
            OR:[
              {pending: true},
            ]            
          }
        }
      }
    )

    if(!friends)
    {
      const friendsCreate = await db.friend.create(
        {
          data: {
            friendOneId: currentUserId ,
            friendTwoId: otherUserId ,
            pending: true
          }
        }
      )
  
      if(friendsCreate)
      {
        // console.log(friendsCreate);
        return (friendsCreate);
      }
    }
    else if(friends) {
      return friends;
    }
  
  } catch (e){
    console.log("friend lib send friend request error",e)
    return null;
  }
}

export const findFriendsRequest = async (currentUserId: string, friendRequestId: string) => {
  try {
    const friends = await db.friend.findFirst(
      {
        where: {
          OR: [
            {friendOneId: currentUserId},
            {friendTwoId: currentUserId}
          ],
          id: friendRequestId,
          pending: false,
        }
      }
    )

    if(friends)
    {
      console.log(friends);
      return (friends);
    }
  
  } catch {
    return null;
  }
}

export const confirmFriendRequest = async (currentUserId: string, friendRequestId: string) => {
  try {
    const profile = await currentUserProfile();
    if(!profile)
    {
      return redirect(`/`)
    }

    const friends = await db.friend.findFirst(
      {
        where: {
          OR: [
            {friendOneId: currentUserId},
            {friendTwoId: currentUserId},            
          ],
          AND: {
            OR:[
              {pending: true},
            ]            
          }
        }
      }
    )

    if(!friends)
    {
      return null;
    }
    else if(friends) {
      // const friends2 = await db.friend.update(
      //   {
      //     where: {
      //       id: friends.id
      //     }
      //   }
      // )
      return friends;
    }
  
  } catch (e){
    console.log("friend lib send friend request error",e)
    return null;
  }
}