"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { FileUpload } from "@/components/files/file-upload";

import {
    Dialog,
    DialogContent,
    DialogDescription,
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

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    })
})
export const EditServerPrompt = () => {
    const { isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();

    const isPromptOpen = isOpen && type === "EditServer";
    const { server }  = propData;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
            imageUrl: "",
        }
    }); 

    
    if(server)  {
        form.setValue("name",server.name);
        form.setValue("imageUrl", server.imageUrl);       
    }
        
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try{
            await axios.patch(`/api/servers/${server?.id}/settings-api`,values);

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
                            Edit your server
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Cook some or cook a lot . Why kiss your bro when you can kiss your server .
                        </DialogDescription>
                    </DialogHeader>
                    <Form  {...form}>
                        <form onSubmit = {form.handleSubmit(onSubmit)} 
                        className="space-y-8">
                            <div className="space-y-8 px-6">
                                <div className="flex items-center justify-center text-center">
                                    {/* IMAGE UPLOAD              */}
                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({field}) => (
                                            <FormItem
                                            >
                                                <FormControl>
                                                    <FileUpload 
                                                        endpoint="serverImage"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                   />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <FormField 
                                control={form.control} 
                                name = "name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter your server name"
                                                {...field}
                                                value = {server?.name}
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
                                            Save
                                        </Button>
                                </DialogFooter>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        )
    }
