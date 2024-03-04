"use client";

import { CreateServerPrompt } from "@/components/prompts/create-server-prompt";
import { useEffect, useState } from "react";
import { InviteServerPrompt } from "@/components/prompts/invite-server-prompt";
import { EditServerPrompt } from "@/components/prompts/edit-server-prompt";
import { ManageMemberPrompt } from "../prompts/manage-member-prompt";

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
        </>
    )
}