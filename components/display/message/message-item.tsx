"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, OldMemberRole, UserProfile } from "@prisma/client";
import { Edit, FileIcon, Magnet, Settings, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar";
import { ActionTooltip } from "@/components/uihelper/action-tooltip";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePrompt } from "@/hooks/use-prompt-store";
import { FilesDisplay } from "../files-display-message";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface ChatItemProps {
  id: string;
  content: string;
  memberProp: Member & {
    userProfile: UserProfile;
  };
  // userProp: UserProfile;
  timestamp: string;
  attachment: boolean;
  fileUrl: string | null;
  deleted: boolean;
  currentUserMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  isReply: Boolean;
  replyId?: string;
  isContinious: Boolean;
};

const roleIconMap :{[key: string]: React.ReactNode}= {
    [OldMemberRole.GUEST]       : null,
    [OldMemberRole.MEMBER]      : <Magnet className="mr-2"/>,
    [OldMemberRole.MODERATOR]   : <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
    [OldMemberRole.ADMIN]       : <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
  }

const formSchema = z.object({
  content: z.string().min(1),
});

export const MessageItem = ({
  id,
  content,
  memberProp,
  attachment,
  timestamp,
  fileUrl,
  deleted,
  currentUserMember: currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
  isContinious,
  isReply,
  replyId

}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = usePrompt();
  const params = useParams();
  const router = useRouter();

  const onMemberClick = () => {
    console.log(`memberPROP2/${memberProp.id == currentMember.id ? `Giong nhau + ${currentMember.id}` : `Khac nhau + ${memberProp.id}`} `);
    if (memberProp.id === currentMember.id) {
      return;
    }
    if (memberProp.id !== currentMember.id)
    {
      router.push(`/servers/${params?.serverId}/directChatChannels/${memberProp.id}/`);
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keyDown", handleKeyDown);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/channel-edit`,
        query: socketQuery,
      });
      const contents = {
        content: (values.content),
        id: id
      };
      await axios.patch(url, contents);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    form.reset({
      content: content,
    })
  }, [content]);

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === OldMemberRole.ADMIN;
  const isModerator = currentMember.role === OldMemberRole.MODERATOR;
  const isOwner = currentMember.id === memberProp.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner ;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;
  const { height, width } = useWindowDimensions();
  
  if(id)
  {
    // console.log("Message Id",id);
    return (
    <div className={`relative group flex items-center w-full `}
      style={{
        overflowWrap: "break-word"
      }}
    >
      
      {/* ${ (isContinious) ? `pl-[48px]` : `` } */}
      {(!isContinious) && (
      <div className="group flex gap-x-2 items-start w-full">
         
        <div onClick={onMemberClick} className="cursor-pointer hover:drop-shadow-md transition">
          {/* <UserProfileAvatar src={memberProp.imageUrl} /> */}
          <UserProfileAvatar src={memberProp.userProfile.imageUrl} />
        </div>
        
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p onClick={onMemberClick} className="font-semibold text-sm hover:underline cursor-pointer">
                {memberProp.nickname}
              </p>

            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          <FilesDisplay
          />
          {!isEditing && (
            <div 
            className={              
              `text-sm text-zinc-600 dark:text-zinc-300 ` 
          }
          style={{
            overflowWrap: "break-word",
            width: (width<769) ? `${width-80}px` : `${width-320}px`
          }}

            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </div>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form 
                className="flex items-center w-full gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              disabled={isLoading}
                              className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                              placeholder="Edited message"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button disabled={isLoading} size="sm" variant="primary">
                    Save
                  </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press escape to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      )}
      {(isContinious) && (
        <div
          className="w-full"
        >
         {!isEditing && (
            <div className={
              `text-sm text-zinc-600 dark:text-zinc-300 ` 
            }
            style={{
              overflowWrap: "break-word",
              width: (width<769) ? `${width-80}px` : `${width-320}px`
            }}

            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </div>
          )}
          {isEditing && (
            <Form {...form}>
              <form 
                className="flex items-center w-full gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              disabled={isLoading}
                              className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 w-full"
                              placeholder="Edited message"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button disabled={isLoading} size="sm" variant="primary">
                    Save
                  </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press escape to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      )}
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash
              onClick={() => onOpen("DeleteMessage", { 
                apiUrl: `${socketUrl}/channel-delete`,
                query: socketQuery,
                messageId: id
               })}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  )
  }
  // else
  // {
    
  // }
  
}
// }