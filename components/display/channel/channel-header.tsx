"use client"

import { Hash } from "lucide-react";

import { MobileToggle } from "@/components/uihelper/mobile-toggle";
import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar";

interface ChannelHeaderProps {
  serverId: string;
  name: string;
  imageUrl?: string;
}

export const ChannelHeader = ({
  serverId,
  name,
  imageUrl
}: ChannelHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )
      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
    </div>
  )
}