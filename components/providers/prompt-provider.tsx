"use client";

import { CreateServerPrompt } from "@/components/prompts/server/create-server-prompt";
import { useEffect, useState } from "react";
import { InviteServerPrompt } from "@/components/prompts/server/invite-server-prompt";
import { EditServerPrompt } from "@/components/prompts/server/edit-server-prompt";
import { ManageMemberPrompt } from "@/components/prompts/user/manage-member-prompt";
import { CreateChannelPrompt } from "../prompts/channel/create-channel-prompt";
import { CreateChannelPromptDiamond } from "../prompts/channel/create-channel-prompt-diamond ";
import { LeaveServerPrompt } from "../prompts/server/leave-server-prompt";
import { DeleteServerPrompt } from "../prompts/server/delete-server-prompt";

export const PromptProvider = () => {
    const [isMounted,setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted)
    {
        return null;
    }
    
    return (
        <>
            <CreateServerPrompt />
            <InviteServerPrompt />
            <EditServerPrompt />
            <ManageMemberPrompt />
            <CreateChannelPrompt />
            <CreateChannelPromptDiamond />
            <LeaveServerPrompt />
            <DeleteServerPrompt />
        </>
    )
}