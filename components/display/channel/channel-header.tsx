"use client"

import { Hash } from "lucide-react";

import { MobileToggle } from "@/components/uihelper/mobile-toggle";

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
      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
    </div>
  )
}