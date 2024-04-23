import { NextResponse } from "next/server";
import { DirectMessage, Message } from "@prisma/client";

import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const MESSAGES_BATCH = 10;

export async function GET(
  req: Request
) {
  try {
    const profile = await currentUserProfile();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const directChannelId = searchParams.get("directChannelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!directChannelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    let messages: DirectMessage[] = [];

    if (cursor) {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          directChannelId,
        },
        include: {
          userProfile: true,
          AttachmentDirect: true,
          messageParent: {
            include: {
              userProfile: {
                select: {
                  id: true,
                  name: true,
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: "desc",
        }
      })
    } else {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        where: {
          directChannelId,
        },
        include: {
          userProfile: true,          
          AttachmentDirect: true,
          messageParent: {
            include: {
              userProfile: {
                select: {
                  id: true,
                  name: true,
                }
              }
            }
          }

        },
        orderBy: {
          createdAt: "desc",
        }
      });
    }

    // console.log("Route is running",messages);
    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
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