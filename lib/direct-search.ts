"use server"

import { db } from "@/lib/db";

export const getOrCreateDirectChannel = async (memberOneId: string, memberTwoId: string) => {
  console.log("Kiem_tra_direct_GETCREATE : \n",memberOneId,"\n",memberTwoId)
  let directConversation = await findDirectChannel(memberOneId, memberTwoId) || await findDirectChannel(memberTwoId, memberOneId);

  if (!directConversation) {
    directConversation = await createNewDirectChannel(memberOneId, memberTwoId);
  }

  if(directConversation?.deleted)
  {
    directConversation = await updateDeleteDirectChannel(directConversation.id);
  }
  return directConversation;
}

const findDirectChannel = async (memberOneId: string, memberTwoId: string) => {
  try {
    const temp = await db.directChannel.findFirst({
      where: {
        AND: [
          { memberOneId: memberOneId },
          { memberTwoId: memberTwoId },
        ]
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

export const findAllDirectChannel = async (memberId: string) => {
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

const updateDeleteDirectChannel = async (directChannelId : string) => {
  try {
    return await db.directChannel.update({
      where: {
        id: directChannelId
      },
      data: {
        deleted: false
      },
      include: {
        memberOne: true,
        memberTwo: true
      }
    })
  }
  catch {
    return null;
  }

}
