import { Channel, DirectChannel, OldChannelType, Server ,ServerInvite} from "@prisma/client";
import { create } from "zustand"

export type PromptType = "CreateServer" | "EditServer" | "InviteServer" | "CreateChannel" | "DeleteServer" | "ManageMember" | "ManageChannel" | "CreateChannelDiamond" | "LeaveServer" | "EditChannel" | "DeleteChannel" | "MessageFile" | "DeleteMessage";

interface PromptAPIData {
    server?: Server
    channel?: Channel;
    directChannelProp?: DirectChannel;
    oldChannelType?: OldChannelType;
    serverInvite?: ServerInvite;
    apiUrl?: string;
    query?: Record<string, any>;
    channelIdPropAPI?: string;
    memberIdPropAPI?: string;
    typeSend?: "sentMem" | "direct";
    messageId?: string;
  }

interface PromptStoredInfo {
    type: PromptType | null;
    propData: PromptAPIData;
    isOpen: boolean;
    onOpen:(type:PromptType, data?:PromptAPIData) => void;
    onClose:() => void;
}

export const usePrompt = create<PromptStoredInfo>((set)=>({
    type: null,
    propData: {},
    isOpen: false,
    onOpen:(type, propData = {}) => set({isOpen: true,type,propData}),
    onClose:() => set({isOpen: false,type: null})
}))
