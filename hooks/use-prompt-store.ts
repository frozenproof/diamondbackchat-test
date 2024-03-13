import { Channel, OldChannelType, Server } from "@prisma/client";
import { create } from "zustand"

export type PromptType = "CreateServer" | "EditServer" | "InviteServer" | "CreateChannel" | "DeleteServer" | "ManageMember" | "ManageChannel" | "CreateChannelDiamond" | "LeaveServer" | "DeleteServerDiamond";

interface PromptAPIData {
    server?: Server
    channel?: Channel;
    oldChannelType?: OldChannelType;
  }

interface PromptStoredInfo {
    type: PromptType | null;
    data: PromptAPIData;
    isOpen: boolean;
    onOpen:(type:PromptType, data?:PromptAPIData) => void;
    onClose:() => void;
}

export const usePrompt = create<PromptStoredInfo>((set)=>({
    type: null,
    data: {},
    isOpen: false,
    onOpen:(type, data = {}) => set({isOpen: true,type,data}),
    onClose:() => set({isOpen: false,type: null})
}))
