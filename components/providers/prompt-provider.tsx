"use client";

import { CreateServerPrompt } from "@/components/prompts/create-server-modal";
import { useEffect, useState } from "react";
import { InviteServerPrompt } from "@/components/prompts/invite-server-modal";
import { EditServerPrompt } from "../prompts/edit-server-prompt";

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
        </>
    )
}