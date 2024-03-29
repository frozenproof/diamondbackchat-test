import { Hash, Pin } from "lucide-react";

import { MobileNavigationLeftToggle } from "@/components/uihelper/left-mobile-toggle";
import { UserStatus } from "@prisma/client";
import { RightChannelToggle } from "@/components/uihelper/right-channel-toggle";
import { MemberWithProfile } from "@/type";
import { ChannelSearchBar } from "./channel-search";
import { SocketStatusDisplay } from "@/components/socket/socket-status-display";

interface ChannelHeaderProps {
  serverId: string;
  name: string;
  imageUrl?: string;
  userAvatar: string;
  userName: string;
  userStatusProp: UserStatus;
  membersList: MemberWithProfile[];
}

export const ChannelHeader = ({
  serverId,
  name,
  imageUrl,
  userAvatar,
  userName,
  userStatusProp,
  membersList
}: ChannelHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 w-full">
      <MobileNavigationLeftToggle 
        serverId={serverId} 
        userAvatar={userAvatar}
        userName={userName}
        userStatus={userStatusProp}
        />
      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
      {/* <Pin /> */}
      <ChannelSearchBar 
      />
      <RightChannelToggle 
        anotherMemberProp={membersList}
      />
    </div>
  )
}