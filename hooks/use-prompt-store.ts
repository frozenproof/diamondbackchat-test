import { Server } from "@prisma/client";
import { create } from "zustand"

export type PromptType = "CreateServer" | "EditServer" | "InviteServer" | "EditServer";



interface PromptServerData {
    server?: Server
}

interface PromptStoredInfo {
    type: PromptType | null;
    data: PromptServerData;
    isOpen: boolean;
    onOpen:(type:PromptType, data?:PromptServerData) => void;
    onClose:() => void;
}

export const usePrompt = create<PromptStoredInfo>((set)=>({
    type: null,
    data: {},
    isOpen: false,
    onOpen:(type, data = {}) => set({isOpen: true,type,data}),
    onClose:() => set({isOpen: false,type: null})
}))
