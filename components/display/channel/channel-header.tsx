"use server"

import { MobileNavigationLeftToggle } from "@/components/uihelper/left-mobile-toggle";
import { UserProfile, UserStatus } from "@prisma/client";
import { RightChannelToggle } from "@/components/uihelper/right-channel-toggle";
import { MemberWithProfile } from "@/type";
import { ChannelSearchBar } from "./channel-search";

interface ChannelHeaderProps {
  serverId: string;
  name: string;
  userProfileProp: UserProfile;
  membersList: MemberWithProfile[];
}

export const ChannelHeader = ({
  serverId,
  name,
  userProfileProp,
  membersList,
}: ChannelHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 w-full">
      <MobileNavigationLeftToggle 
        serverId={serverId} 
        userProfileProp={userProfileProp}
        />
      <p className="font-semibold text-md text-black dark:text-white w-full">
        {name}
      </p>
      {/* <Pin /> */}
      <ChannelSearchBar 
      />
      <RightChannelToggle 
        anotherMemberProp={membersList}
        userProfileIdProp={userProfileProp.id}
      />
    </div>
  )
}