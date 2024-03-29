import { db } from "@/lib/db";

export const getOrCreateDirectChannel = async (memberOneId: string, memberTwoId: string) => {
  let conversation = await findDirectChannel(memberOneId, memberTwoId) || await findDirectChannel(memberTwoId, memberOneId);

  if (!conversation) {
    conversation = await createNewDirectChannel(memberOneId, memberTwoId);
  }

  return conversation;
}

const findDirectChannel = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.directChannel.findFirst({
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