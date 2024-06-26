"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePrompt } from "@/hooks/use-prompt-store";
import { EmojiPicker } from "@/components/uihelper/emoji-picker";
import { useSocket } from "@/components/providers/socket-provider";
import { Member } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface MessageInputProps {
  apiUrl: string;
  query: Record<string, any>;
  channelName: string;
  memberIdProp: string;
  memberRank: string;
  memberListProp: Member[];
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const MessageInput = ({
  apiUrl,
  query,
  channelName,
  memberIdProp,
  memberRank,
  memberListProp
}: MessageInputProps) => {
  const { onOpen } = usePrompt();
  const { toast } = useToast()
  const { socketActual } = useSocket();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    }
  });

  const channelId = query.channelId;
  // console.log("Channel id is",channelId);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      if (!socketActual) {
        toast({
          description: "Your app is not connected",
        })
        return;
      }
      form.reset();
      router.refresh();
      const testSend = await axios.post(url, {...values,checkMessageReplyId: "lmaoREPLY"});
      const messageData = testSend.data ;
      socketActual.emit("channel-input",`chat:${messageData.channelId}:messages`, messageData,"server-channel");
  } catch (error) {
      console.log(error);
    }
  }

  if(memberRank == "Basic Member")
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen("MessageFile", { channelIdPropAPI: channelId,memberIdPropAPI:memberIdProp,typeSend: "sentMem" })}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>

                  <Input
                    id="input"
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 "
                    placeholder={`Message ${"#" + channelName}`}
                    maxLength={2000}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
  else
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen("MessageFile", { channelIdPropAPI: channelId,memberIdPropAPI:memberIdProp,typeSend: "sentMem" })}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    id="input"
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 "
                    placeholder={`Message ${"#" + channelName}`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}