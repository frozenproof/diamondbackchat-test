import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const profile = await currentUserProfile();
        const { content,checkMessageReplyId,isReplyAPI } = await req.json();
        const { searchParams } = new URL(req.url);
    
        const directChatIdProp = searchParams.get("channelId");

        if (!profile) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!directChatIdProp) {
          return new NextResponse("Server ID missing", { status: 400 });
        }
    
        // console.log("This is check file",checkMessageReplyId);

        const channel = await db.directChannel.findFirst({
          where: {
            id: directChatIdProp as string,
          }
        });
    
        if (!channel) {
          return null
        }
    
    
        const message = await db.directMessage.create({
          data: {
            content,
            hasAttachment: false,
            directChannelId: directChatIdProp as string,
            userProfileId: profile.id,
            isReply: false
          },
          include: {
            userProfile: {
              select: {
                name: true,
                imageUrl: true
              }
            }
            }
        });

        if((checkMessageReplyId!== null || checkMessageReplyId !== undefined) && isReplyAPI === true)
        {
          const message2 = await db.directMessage.update({
            where: {
              id: message.id,
              version: message.version
            },
            data: {
              messageParentId: checkMessageReplyId,
              version: {
                increment: 1
              },
              isReply: true,
              edited: false,
              createdAt: new Date()
            }
          })
          const message3 = await db.directMessage.findFirst({
            where: {
              id: message2.id,
            },
            include: {
              userProfile: true,
              messageParent: {
                include: {
                  userProfile: true
                }
              }
            }
          });
          // console.log("testing reply", message3)
         return NextResponse.json(message3);
        }

        return NextResponse.json(message);
      } catch (error) {
        console.log("CHANNELS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
