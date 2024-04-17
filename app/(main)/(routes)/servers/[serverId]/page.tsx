"use server"

import { EvervaultCard } from "@/components/effects/evervault/EvervaultCard"
import { SocketStatusDisplay } from "@/components/socket/socket-status-display";
import { MobileNavigationLeftToggle } from "@/components/uihelper/left-mobile-toggle";
import { currentUserProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

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
    if(params.serverId)
    return (
        <div
            className="text-center border-[8px] "
        >
            <MobileNavigationLeftToggle 
            serverId={params.serverId} 
            userProfileProp={profile}
            />
            <SocketStatusDisplay />
            {/* (　･ω･)☞	Create a channel and something productive ! */}
        </div>                
    )
}

export default ServerIdPage