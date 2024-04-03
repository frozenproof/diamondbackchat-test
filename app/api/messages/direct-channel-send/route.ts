import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const profile = await currentUserProfile();
        const { content,checkFile } = await req.json();
        const { searchParams } = new URL(req.url);
    
        const directChatIdProp = searchParams.get("directChatId");

        if (!profile) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!directChatIdProp) {
          return new NextResponse("Server ID missing", { status: 400 });
        }
    
        console.log("This is check file",checkFile);

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
            userProfile: true
            }
        });

        return NextResponse.json(message);
      } catch (error) {
        console.log("CHANNELS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
