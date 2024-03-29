"use client";

import { CreateServerPrompt } from "@/components/prompts/server/create-server-prompt";
import { useEffect, useState } from "react";
import { InviteServerPrompt } from "@/components/prompts/server/invite-server-prompt";
import { EditServerPrompt } from "@/components/prompts/server/edit-server-prompt";
import { ManageMemberPrompt } from "@/components/prompts/user/manage-member-prompt";
import { CreateChannelPrompt } from "@/components/prompts/channel/create-channel-prompt";
import { CreateChannelPromptDiamond } from "@/components/prompts/channel/create-channel-prompt-diamond ";
import { LeaveServerPrompt } from "@/components/prompts/server/leave-server-prompt";
import { DeleteServerPrompt } from "@/components/prompts/server/delete-server-prompt";
import { DeleteChannelPrompt } from "@/components/prompts/channel/delete-channel-prompt";
import { EditChannelPrompt } from "../prompts/channel/edit-channel-prompt";
import { MessageFilePrompt } from "../prompts/file/message-file-modal";

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
            <DeleteChannelPrompt />
            <EditChannelPrompt />
            <MessageFilePrompt />
        </>
    )
}