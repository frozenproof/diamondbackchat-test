"use client"

import { ServerWithMembersWithProfiles } from "@/type";
import { OldChannelType, OldMemberRole } from "@prisma/client";
import { ActionTooltip } from "../uihelper/action-tooltip";
import { usePrompt } from "@/hooks/use-prompt-store";
import { Plus, Settings } from "lucide-react";


interface ServerNavigationProps {
    label: string;
    role?: OldMemberRole;
    sectionType: "channels" | "members";
    oldChannelType?: OldChannelType;
    server?: ServerWithMembersWithProfiles;
  };
  
export const ServerNavigation = ({
    label,
    role,
    sectionType,
    oldChannelType,
    server,
  }: ServerNavigationProps) => {
    const { onOpen } = usePrompt()

    return (
        <div className="flex items-center justify-between py-2">
        <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        {role !== OldMemberRole.GUEST && sectionType === "channels" && (
          <ActionTooltip label="Create Channel" side="top">
            <button
              onClick={() => onOpen("CreateChannel", { oldChannelType })}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            >
              <Plus className="h-4 w-4" />
            </button>
          </ActionTooltip>
        )}
        {role === OldMemberRole.ADMIN && sectionType === "members" && (
          <ActionTooltip label="Manage Members" side="top">
            <button
              onClick={() => onOpen("ManageMember", { server })}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            >
              <Settings className="h-4 w-4" />
            </button>
          </ActionTooltip>
        )}
      </div>
    )
}