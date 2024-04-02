"use client"
import { MobileNavigationLeftToggle } from "@/components/uihelper/left-mobile-toggle";
import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar";

import { DirectChannel, UserProfile, UserStatus } from "@prisma/client";

interface DirectHeaderProps {
    userAvatarProp: string;
    userNameProp: string;
    userStatusProp: UserStatus;
    directChannelProp?: (DirectChannel & {
        memberOne: UserProfile,
        memberTwo: UserProfile
      })[];
    imageUrl?: string;
    name?: string;

  }

export const DirectChannelHeader = ({
    imageUrl,
    name,
    userAvatarProp,
    userNameProp,
    userStatusProp,
    directChannelProp
}:DirectHeaderProps) => {


    if(!userAvatarProp || !directChannelProp)
    return null;
    return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
        {/* <MobileToggle serverId={serverId} /> */}
        <MobileNavigationLeftToggle 
        userAvatar={userAvatarProp}
        userName={userNameProp}
        userStatus={userStatusProp}
        directChannelProp={directChannelProp}
        />
        <UserProfileAvatar 
            src={imageUrl}
            className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
        
        <div>
            {name}
        </div>
    </div>
    )
}