"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

import { useModal } from "@/hooks/use-modal-store";


export const InviteServerModal = () => {
    const { isOpen,onClose,type } = useModal();
    const isModalOpen = isOpen && type === "InviteServer"

 return ( 
        <Dialog open = {isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite anyone 
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Give your server more details.
                    </DialogDescription>
                </DialogHeader>
            <div>
                
            </div>
            </DialogContent>
        </Dialog>
    )
}
