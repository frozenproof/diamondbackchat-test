"use client";

import axios from "axios";
import qs from "query-string";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePrompt } from "@/hooks/use-prompt-store";
import { MultiFileUpload } from "@/components/files/multi-file-upload";

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required."
  })
});

export const MessageFilePrompt = () => {
  const { isOpen, onClose, type, propData } = usePrompt();
  const router = useRouter();

  const isModalOpen = isOpen && type === "MessageFile";
  const { channelIdPropAPI,memberIdPropAPI,typeSend } = propData;
  // console.log("this is message file modal",channelIdPropAPI,"\n",memberIdPropAPI);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    }
  });

  const handleClose = () => {
    form.reset();
    onClose();
  }

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
    try {
      alert("received")
      router.refresh();
      onClose();
      // handleClose();
    } catch (error) {
      console.log(error);
    }
  }
  if(!channelIdPropAPI || !memberIdPropAPI)
  {
    // console.log("No channel detected");
    return null;
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Send files {channelIdPropAPI} here
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            This is a fire and I don't know how {memberIdPropAPI}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <MultiFileUpload
                          channelIdProp={channelIdPropAPI}
                          memberIdProp={memberIdPropAPI}
                          type={typeSend}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}
              onClick={onClose}
              >
                Done
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}