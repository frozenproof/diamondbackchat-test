import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { channelId: string } }
  ) {
    try {
      const profile = await currentUserProfile();
  
      if (!profile) {
        throw new Error("Unauthorized");
      }
  
      // const server = await db.server.delete({
      //   where: {
      //     id: params.serverId,
      //     userProfileId: profile.id,
      //   }
      // });
      console.log("CHANNEL_ID_DELETE",params.channelId)
      const channel = await db.directChannel.updateMany({
        where: {
          id: params.channelId,
        },
        data: {
          deleted: true
        }
      });
  
      return NextResponse.json(channel);
    } catch (error) {
      console.log("[CHANNEL_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }