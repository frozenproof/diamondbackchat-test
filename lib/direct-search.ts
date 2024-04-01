"use server"

import { db } from "@/lib/db";

export const getOrCreateDirectChannel = async (memberOneId: string, memberTwoId: string) => {
  console.log("Kiem_tra_direct_GETCREATE : \n",memberOneId,"\n",memberTwoId)
  let directConversation = await findDirectChannel(memberOneId, memberTwoId) || await findDirectChannel(memberTwoId, memberOneId);

  if (!directConversation) {
    directConversation = await createNewDirectChannel(memberOneId, memberTwoId);
  }

  return directConversation;
}
export const getAllDirectChannel = async (memberOneId: string) => {
  console.log("Kiem_tra_direct_GET : \n",memberOneId,"\n")
  let conversation = await findAllDirectChannel(memberOneId);
  if (!conversation) {
    return null
  }
  // console.log(conversation);
  return conversation;
}

const findDirectChannel = async (memberOneId: string, memberTwoId: string) => {
  try {
    const temp = await db.directChannel.findFirst({
      where: {
        AND: [
          { memberOneId: memberOneId },
          { memberTwoId: memberTwoId },
        ],
        deleted: false
      },
      include: {
        memberOne: true,
        memberTwo: true
      }
    });
    return temp;
  } catch {
    return null;
  }
}

const findAllDirectChannel = async (memberId: string) => {
  try {
    const temp = await db.directChannel.findMany({
      where: {
        OR: [
          { memberOneId: memberId },
          { memberTwoId: memberId },          
        ]
        ,
        deleted: false
      },
      include: {
        memberOne: true,
        memberTwo: true
      }
    });
    return temp;
  } catch {
    return null;
  }
}

const createNewDirectChannel = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.directChannel.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: true,
        memberTwo: true
      }
    })
  } catch {
    return null;
  }
}