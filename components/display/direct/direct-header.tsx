"use client"

import { ServerWithMembersWithProfiles } from "@/type";
import { OldMemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Cat, ChevronDown, Settings, UserPlus, Users, LogOut, PlusSquare, Fingerprint } from "lucide-react";
import { ActionTooltip } from "@/components/uihelper/action-tooltip";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { usePrompt } from "@/hooks/use-prompt-store";

export const DirectHeader = ({
}) => {
    const { onOpen } = usePrompt();
    return ( 
            <div>
                Direct header
            </div>
     );
}
 

