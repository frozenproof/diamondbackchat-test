"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePrompt } from "@/hooks/use-prompt-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OldChannelType } from "@prisma/client";

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Channel name is required."
    }),
    type: z.string().min(1,{
        message: "Channel type is required."
    })
})
export const CreateChannelPromptDiamond = () => {
    const { isOpen,onClose,type } = usePrompt();
    const router = useRouter();

    const isPromptOpen = isOpen && type === "CreateChannelDiamond"

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
            type: OldChannelType.TEXT,
        }
    }); 

const isLoading = form.formState.isSubmitting;

const onSubmit = async (values: z.infer<typeof formSchema>) =>{
    try{
        await axios.post("/api/servers",values);

        form.reset();
        router.refresh();
        onClose();
    }
    catch(error)
    {
        console.log(values);
    }
}

const handleClose = () => {
    form.reset();
    onClose();
}

return ( 
        <Dialog open = {isPromptOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create a channel
                    </DialogTitle>
                </DialogHeader>
                <Form  {...form}>
                    <form onSubmit = {form.handleSubmit(onSubmit)} 
                    className="space-y-8">
                        <div className="space-y-8 px-6">
                        <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                <FormItem
                                    
                                >
                                    <FormLabel>Channel Type</FormLabel>
                                    <FormControl>
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField 
                            control={form.control} 
                            name = "name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                        channel name
                                    </FormLabel>
                                    <FormControl>
                                        
                                        <Input
                                            disabled={isLoading}
                                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                            placeholder="general"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <div className="text-center justify-center items-center bg-gray-100 px-6 py-4">
                            <DialogFooter>
                                    <Button className="flex" disabled={isLoading} variant={"primary"}>
                                        Create
                                    </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
