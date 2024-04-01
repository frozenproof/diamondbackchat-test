// "use server"
//run on server but is a server function , not to be confused with server action
import { db } from "@/lib/db";
import { currentUserProfile } from "./current-profile";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

// export const getFriendList = async (memberOneId: string) => {
//   console.log("Kiem_tra_direct_GETCREATE : \n",memberOneId,"\n",memberTwoId)
//   let conversation = await findDirectChannel(memberOneId) || await findDirectChannel(memberOneId);

//   if (!conversation) {
//     conversation = await createNewDirectChannel(memberOneId, memberTwoId);
//   }

//   return conversation;
// }
// export const getAllDirectChannel = async (memberOneId: string) => {
//   console.log("Kiem_tra_direct_GET : \n",memberOneId,"\n")
//   let conversation = await findAllDirectChannel(memberOneId);
//   if (!conversation) {
//     return null
//   }
//   // console.log(conversation);
//   return conversation;
// }

// const findFriends = async (memberOneId: string, memberTwoId: string) => {
//   try {
//     const temp = await db.directChannel.findFirst({
//       where: {
//         AND: [
//           { memberOneId: memberOneId },
//           { memberTwoId: memberTwoId },
//         ],
//         deleted: false
//       },
//       include: {
//         memberOne: true,
//         memberTwo: true
//       }
//     });
//     return temp;
//   } catch {
//     return null;
//   }
// }

// const findAllDirectChannel = async (memberId: string) => {
//   try {
//     const temp = await db.directChannel.findMany({
//       where: {
//         OR: [
//           { memberOneId: memberId },
//           { memberTwoId: memberId },          
//         ]
//         ,
//         deleted: false
//       },
//       include: {
//         memberOne: true,
//         memberTwo: true
//       }
//     });
//     return temp;
//   } catch {
//     return null;
//   }
// }

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