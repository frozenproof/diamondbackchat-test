import { Server } from "@prisma/client";
import { create } from "zustand"

export type ModalType = "CreateServer" | "EditServer" | "InviteServer";



interface ModalServerData {
    server?: Server
}

interface ModalStoredInfo {
    type: ModalType | null;
    data: ModalServerData
    isOpen: boolean;
    onOpen:(type:ModalType, data?:ModalServerData) => void;
    onClose:() => void;
}

export const useModal = create<ModalStoredInfo>((set)=>({
    type: null,
    data: {},
    isOpen: false,
    onOpen:(type, data = {}) => set({isOpen: true,type,data}),
    onClose:() => set({isOpen: false,type: null})
}))
