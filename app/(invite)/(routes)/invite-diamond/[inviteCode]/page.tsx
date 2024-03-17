import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentUserProfile } from "@/lib/current-profile";
import { isRedirectError } from "next/dist/client/components/redirect";

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

    const alreadyJoinedServer = await db.server.findFirst({
      where: {
        id: findServerId.serverId,
        members: {
          some: {
            userProfileId: profile.id
          }
        },
        deleted: false
      }
    });
  
    if (alreadyJoinedServer) {
      return redirect(`/servers/${alreadyJoinedServer.id}`);
    }
  
    const server2 = await db.server.update({
      where: {
        id: findServerId.serverId,
      },
      data: {
        members: {
          create: [
            {
              userProfileId: profile.id,
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
        inviteCode: server2.inviteCode,
      },
      create: {
        inviteCode:server2.inviteCode,
        userProfileId: profile.id,
        serverId: server2.id,
        assignedBy: profile.userId
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