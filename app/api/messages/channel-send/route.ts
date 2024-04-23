import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db"

import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const profile = await currentUserProfile();
        const { content,checkMessageReplyId } = await req.json();
        const { searchParams } = new URL(req.url);
    
        const serverIdProp = searchParams.get("serverId");
        const channelIdProp = searchParams.get("channelId");

        if (!profile) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!serverIdProp || !channelIdProp) {
          return new NextResponse("Server ID missing", { status: 400 });
        }
    
        // console.log("This is check file",checkMessageReplyId);
        const serverAPI = await db.server.findFirst({
          where: {
            id: serverIdProp as string,
            Member: {
              some: {
                userProfileId: profile.id
              }
            }
          },
          include: {
            Member: true,
          }
        });
    
        if(!serverAPI)
        {
          return null
        }

        const channel = await db.channel.findFirst({
          where: {
            id: channelIdProp as string,
          }
        });
    
        if (!channel) {
          return null
        }
    
        const member = serverAPI.Member.find((member) => member.userProfileId === profile.id);
    
        if (!member) {
          return null
        }
    
        const message = await db.message.create({
          data: {
            content,
            hasAttachment: false,
            channelId: channelIdProp as string,
            memberId: member.id,
            isReply: (checkMessageReplyId === "lmaoREPLY") ? false : true,
          },
          include: {
            member: {
              include: {
                userProfile: {
                  select: {
                    imageUrl: true
                  }
                }
              }
            }
            }
        });

        if(checkMessageReplyId !== "lmaoREPLY" && (checkMessageReplyId!== null || checkMessageReplyId !== undefined))
        {
          const message2 = await db.message.update({
            where: {
              id: message.id,
              version: message.version
            },
            data: {
              messageParentId: checkMessageReplyId,
              version: {
                increment: 1
              },
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
          const message3 = await db.message.findFirst({
            where: {
              id: message2.id,
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
            }
          });
          console.log("testing reply", message3)
         return NextResponse.json(message3);

        }

        const channelKey = `chat:${channelIdProp}:messages`;
        console.log("this is channel key",channelKey);
        return NextResponse.json(message);
        
      } catch (error) {
        console.log("CHANNELS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
