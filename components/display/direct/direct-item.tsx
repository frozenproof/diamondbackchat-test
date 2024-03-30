"use client";

import { 
  Channel, 
  DirectChannel, 
  OldChannelType, 
  OldMemberRole,
  Server
} from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { PromptType, usePrompt } from "@/hooks/use-prompt-store";
import { ActionTooltip } from "@/components/uihelper/action-tooltip";

interface ServerChannelProps {
  directChannelProp: DirectChannel;
  nameProp: String;
  avatar: String;
}

export const DirectChannelItem = ({
  directChannelProp,
  nameProp,
  avatar
}: ServerChannelProps) => {
  const { onOpen } = usePrompt();
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/meself/chat/${directChannelProp.id}`)
  }

  const onAction = (e: React.MouseEvent, action: PromptType) => {
    e.stopPropagation();
    onOpen(action, { directChannelProp });
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "ml-auto group px-2 py-2 rounded-md flex  gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === directChannelProp.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <div className={cn(
        "font-semibold  text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition mr-auto",
        params?.channelId === directChannelProp.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white "
      )}>
        <div
            className=" relative"
        >
          Lmao
            {nameProp}
        </div>
        {
        <div className="flex gap-x-2 relative">
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, "DeleteChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
        }
      </div>

    </button>
  )
}