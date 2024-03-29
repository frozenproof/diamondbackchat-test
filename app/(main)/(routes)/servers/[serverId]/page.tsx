import { EvervaultCard } from "@/components/effects/EvervaultCard"
import { BackgroundBeams } from "@/components/effects/background-beams"
import { SocketStatusDisplay } from "@/components/socket/socket-status-display";
import { MobileNavigationLeftToggle } from "@/components/uihelper/left-mobile-toggle";
import { currentUserProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import * as ScrollArea from '@radix-ui/react-scroll-area';

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
        return redirect(`/meself`);
    }
    return (
        <EvervaultCard
            className="text-center border-[8px] "
        >
            <MobileNavigationLeftToggle 
            serverId={params.serverId} 
            userAvatar={profile.imageUrl}
            userName={profile.name}
            userStatus={profile.status}
            />
            <SocketStatusDisplay />
            {/* (　･ω･)☞	Create a channel and something productive ! */}
        </EvervaultCard>
                
    )
}

export default ServerIdPage