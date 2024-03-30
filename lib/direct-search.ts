import { db } from "@/lib/db";

export const getOrCreateDirectChannel = async (memberOneId: string, memberTwoId: string) => {
  console.log("Kiem_tra_direct_GETCREATE : \n",memberOneId,"\n",memberTwoId)
  let conversation = await findDirectChannel(memberOneId, memberTwoId) || await findDirectChannel(memberTwoId, memberOneId);

  if (!conversation) {
    conversation = await createNewDirectChannel(memberOneId, memberTwoId);
  }

  return conversation;
}
export const getAllDirectChannel = async (memberOneId: string) => {
  console.log("Kiem_tra_direct_GET : \n",memberOneId,"\n")
  let conversation = await findAllDirectChannel(memberOneId);
  if (!conversation) {
    return null
  }
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

const findAllDirectChannel = async (memberOneId: string) => {
  try {
    const temp = await db.directChannel.findMany({
      where: {
        AND: [
          { memberOneId: memberOneId },
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