import { BanWithMemberWithProfile } from "@/type";
import { Channel, DirectChannel, Member, OldChannelType, Server, ServerInvite, UserProfile } from "@prisma/client";
import { create } from "zustand";

export type PromptType = "CreateServer" | "EditServer" | "InviteServer" | "CreateChannel" | "DeleteServer" | "ManageMember" | "ManageChannel" | "LeaveServer" | "EditChannel" | "DeleteChannel" | "DeleteDirectChannel" | "MessageFile" | "DeleteMessage" | "UserProfileDisplay" | "AccountSetting" | "MemberNickname" | "BanManage" | "ReplyMessage";

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
    memberPropAPI?: Member;
    userProfilePropAPI?: UserProfile;
    currentUserPropAPIID?: string;
    banList?: BanWithMemberWithProfile[];
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
