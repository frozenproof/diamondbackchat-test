import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db"
import { NextApiResponseServerIo } from "@/type";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,res: NextApiResponseServerIo){
    try{
        const profile = await currentUserProfile();
        const { messageId } = await req.json();
        const { searchParams } = new URL(req.url);
    
        const channelIdProp = searchParams.get("channelId");

        if (!profile) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!channelIdProp) {
          return new NextResponse("Direct ID missing", { status: 400 });
        }
    
        console.log("This is check file",messageId);

        const channel = await db.directChannel.findFirst({
          where: {
            id: channelIdProp as string,
            OR: [
              {memberOneId: profile.id},
              {memberTwoId: profile.id}
            ]
          }
        });
    
        if (!channel) {
          return null
        }
    

        const message = await db.directMessage.delete({
          where:{
            id:messageId,
            directChannelId: channel.id
          }
        });
        // const message = await db.directMessage.update({
        //   where:{
        //     id:id,
        //     directChannelId: channel.id
        //   },
        //   data: {
        //     edited: true,
        //     deleted: true
        //   },
        // });
        const channelKey = `chat:${channelIdProp}:messages`;
        console.log("this is direct channel delete",channelKey);
        // socket?.server?.emit(channelKey, message);

        return NextResponse.json(message);
      } catch (error) {
        console.log("CHANNELS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
