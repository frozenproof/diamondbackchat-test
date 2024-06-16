"use server"

import { SocketStatusDisplay } from "@/components/socket/socket-status-display";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { MobileNavigationLeftToggle } from "@/components/uihelper/left-mobile-toggle";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import QRCode from "@/components/extra/url/url";

interface ChannelIdPageProps {
    params: {
      serverId: string;
    };
  }

const ServerIdPage = async(
    {params}: ChannelIdPageProps
) => {
    const profile = await currentUserProfile();
    if(!profile)
    {
        return redirect(`/meself/friend`);
    }
    const server = await db.server.findUnique
    ({
        
        where:{
            id: params.serverId,
            Member:{
                some:{
                    userProfileId: profile.id,
                    deleted: false
                },
            },
            deleted: false
        }
    })
    const serverInvites = await db.serverInvite.findFirst({
        where: {
            serverId: server?.id,
            userProfileId: profile.id
        }
    })

    if(!server)
    {
        return redirect("/meself/friend");
    }
    if(params.serverId && serverInvites)
    {
        const url2 = serverInvites.inviteCode;
        return (
            <div
                className="border-[8px] h-full w-full justify-center flex flex-col items-center"
            >
               <div
                    className="flex flex-col justify-center items-center"
                >
                <MobileNavigationLeftToggle 
                serverId={params.serverId} 
                userProfileProp={profile}
                />
                 <SocketStatusDisplay />
                </div>
                <div
                    className="flex flex-col pt-8 pb-8"
                >
                <MovingBorderButton
                        borderRadius="1.75rem"
                        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            
                >
                <div
                    className="items-center justify-center "
                >
                    {server.name}
                </div>           
                </MovingBorderButton>
                </div>
                <div>
                    <QRCode data={url2} />
                </div>    
                {/* (　･ω･)☞	Create a channel and something productive ! */}
             
            </div>                
        )
    }
    
}

export default ServerIdPage