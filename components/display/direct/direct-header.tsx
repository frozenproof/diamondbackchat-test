// "use client"
// khong duoc dung use client o day
"use server"

import { ChatVideoButton } from "@/components/chat-video-button";
import { MobileNavigationLeftToggle } from "@/components/uihelper/left-mobile-toggle";
import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar";

import { UserProfile } from "@prisma/client";

interface DirectHeaderProps {
    userProfileProp: UserProfile
    imageUrl: string;
    name: string;
    directChannelHeaderIdProp: string;
    otherUserIdSocket: string;
  }

export const DirectChannelHeader = ({
    imageUrl,
    name,
    userProfileProp,
    directChannelHeaderIdProp,
    otherUserIdSocket
}:DirectHeaderProps) => {
    return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
        {/* <MobileToggle serverId={serverId} /> */}
        <MobileNavigationLeftToggle 
            userProfileProp={userProfileProp}
        />
        <UserProfileAvatar 
            src={imageUrl}
            className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
        
        <div>
            {name}
        </div>
        <div
            className="ml-auto"
        >
            <ChatVideoButton 
                directChannelId={directChannelHeaderIdProp}
                otherUserIdSocket={otherUserIdSocket}
                currentUser={userProfileProp}
            />
        </div>
    </div>
    )
}