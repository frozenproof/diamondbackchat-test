"use client";

import { 
  Channel, 
  OldChannelType, 
  OldMemberRole,
  Server
} from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { PromptType, usePrompt } from "@/hooks/use-prompt-store";
import { ActionTooltip } from "../uihelper/action-tooltip";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: OldMemberRole;
}

const iconMap : {[key: string]: React.ReactNode}= {
  [OldChannelType.TEXT] : <Hash     className="h-4 w-4"/>,
  [OldChannelType.AUDIO]: <Mic      className="h-4 w-4"/>,
  [OldChannelType.VIDEO]: <Video    className="h-4 w-4"/>,
}

export const ServerChannel = ({
  channel,
  server,
  role
}: ServerChannelProps) => {
  const { onOpen } = usePrompt();
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
  }

  const onAction = (e: React.MouseEvent, action: PromptType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "ml-auto group px-2 py-2 rounded-md flex  gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      { Icon }
      <div className={cn(
        "font-semibold  text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition mr-auto",
        params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white flex flex-row"
      )}>
        <div
            className="overflow-hidden line-clamp-1 relative"
        >
            {channel.name}
        </div>
        {role !== OldMemberRole.GUEST && (
        <div className="flex gap-x-2 relative">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => onAction(e, "EditChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, "DeleteChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
      </div>

    </button>
  )
}