import { NextResponse } from "next/server";
import { Message } from "@prisma/client";

import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const MESSAGES_BATCH_MAX = 20;

export async function GET(
  req: Request
) {
  try {
    const profile = await currentUserProfile();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH_MAX,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
        },
        include: {
          // userProfile: true,
          member:  {
            include: {
              userProfile: true
            }
          },
          AttachmentChannel: true,
          messageParent: true
        },
        orderBy: {
          createdAt: "desc",
        }
      })
    } else {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH_MAX,
        where: {
          channelId,
        },
        include: {
          // userProfile: true,
          member: {
            include: {
              userProfile: true
            }
          },
          AttachmentChannel: true,
          messageParent: true
        },
        orderBy: {
          createdAt: "desc",
        }
      });
    }


    // console.log("Whatever_this_is",messages[messages.length-1].content)

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH_MAX) {
      nextCursor = messages[MESSAGES_BATCH_MAX - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor
    });
    
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}