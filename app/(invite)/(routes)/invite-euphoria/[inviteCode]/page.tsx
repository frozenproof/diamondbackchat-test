import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentUserProfile } from "@/lib/current-profile";
import { isRedirectError } from "next/dist/client/components/redirect";
import { v4 as uuidv4 } from "uuid";

interface InviteCodePagePropsDiamond {
  params: {
    inviteCode: string;
  };
};

const InviteCodePageDiamond = async ({
  params
}: InviteCodePagePropsDiamond) => {
  try {
    const profile = await currentUserProfile();

    if (!profile) {
      return redirectToSignIn();
    }
  
    if (!params.inviteCode) {
      return redirect("/");
    }
  
    const findServerId = await db.serverInvite.findFirst(
      {
        where: {
          inviteCode: params.inviteCode,
        }
      }
    )

    if (!findServerId) {
      return redirect("/");
    }

    const alreadyJoinedServer = await db.member.findFirst({
      where: {
        serverId: findServerId.serverId,
        userProfileId: profile.id,
        deleted: false
      }
    });
  
    if (alreadyJoinedServer) {
      if (alreadyJoinedServer.deleted === false)    
      {
        return redirect(`/servers/${alreadyJoinedServer.serverId}`);
      }
      else if(alreadyJoinedServer.deleted === true)
      {
        const alreadyJoinedServer2 = await db.member.update({
          where: {
            id: alreadyJoinedServer.id     
          },
          data: {
            deleted: false
          }
        });

        return redirect(`/servers/${alreadyJoinedServer2.serverId}`);

      }
    }
  
    const server2 = await db.server.update({
      where: {
        id: findServerId.serverId,
      },
      data: {
        Member: {
          create: [
            {
              userProfileId: profile.id,
              nickname: profile.name 
            }
          ]
        }
      }
    });
    
    const inviteServer = await db.serverInvite.upsert({
      where: {
        inviteId: {
          userProfileId: profile.id,
          serverId: server2.id,
        },
      },
      update: {
        inviteCode: uuidv4(),
      },
      create: {
        inviteCode:uuidv4(),
        userProfileId: profile.id,
        serverId: server2.id,
      },
    })

    if (server2) {
      return redirect(`/servers/${server2.id}`);
    }
    
    return null;
  }
  catch (error)
  {
    if (isRedirectError(error)) {
      throw error;
    }    
    console.log("Unknown error",error);
  }
}
 
export default InviteCodePageDiamond;