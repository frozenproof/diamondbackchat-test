"use client"

import { Hash } from "lucide-react";

import { MobileToggle } from "@/components/uihelper/mobile-toggle";
import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar";

import { redirect } from "next/navigation";
import { currentUserProfile } from "@/lib/current-profile";
import { Shop } from "@/components/extra/app-shop";

interface DirectHeaderProps {

    imageUrl?: string;
  }

export const DirectHeader = ({
    imageUrl,
}:DirectHeaderProps) => {


    return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
        {/* <MobileToggle serverId={serverId} /> */}

        
        <UserProfileAvatar 
            src={imageUrl}
            className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
        
        <Shop />
    </div>
    )
}