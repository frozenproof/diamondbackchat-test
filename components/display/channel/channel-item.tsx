"use client";

import { 
  Channel, 
  OldChannelType, 
  OldMemberRole,
  Server
} from "@prisma/client";
import { Edit, Hash, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { PromptType, usePrompt } from "@/hooks/use-prompt-store";
import { ActionTooltip } from "@/components/uihelper/action-tooltip";

interface ChannelItemProps {
  channel: Channel;
  server: Server;
  role?: OldMemberRole;
}

const iconMap : {[key: string]: React.ReactNode}= {
  [OldChannelType.TEXT] : <Hash     className="h-[18px] w-[18px]"/>,
  [OldChannelType.AUDIO]: <Mic      className="h-4 w-4"/>,
  [OldChannelType.VIDEO]: <Video    className="h-4 w-4"/>,
}

export const ChannelItem = ({
  channel,
  server,
  role
}: ChannelItemProps) => {
  const { onOpen } = usePrompt();
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  const onClick = () => {
    // alert("WHAT IS ALERTING")
    console.log("pressed")
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
  }

  const onAction = (MouseEvent: React.MouseEvent, action: PromptType) => {
    MouseEvent.stopPropagation();
    onOpen(action, { channel, server });
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "ml-auto group px-2 py-2 rounded-md flex flex-row gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      { Icon }
      <div className={cn(
        "font-semibold  text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition mr-auto align-top",
        params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white "
      )}>
        <div
            className="overflow-hidden relative align-top text-center "
            style={{fontSize: 14}}
        >
            {channel.name} 
        </div>
        {role !== OldMemberRole.GUEST && (
        <div className="flex gap-x-2 relative">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(MouseEvent) => onAction(MouseEvent, "EditChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(MouseEvent) => onAction(MouseEvent, "DeleteChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
      </div>

    </button>
  )
}