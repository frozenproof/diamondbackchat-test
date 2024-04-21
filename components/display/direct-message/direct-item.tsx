"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AttachmentDirect, UserProfile } from "@prisma/client";
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ActionTooltip } from "@/components/uihelper/action-tooltip";
import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar";
import { usePrompt } from "@/hooks/use-prompt-store";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { format } from "date-fns";
import { FilesDisplay } from "../files-display-message";

interface ChatItemProps {
  id: string;
  content: string;
  UserProp: UserProfile;
  // userProp: UserProfile;
  timestamp: string;
  hasAttachment: boolean;
  attachmentsList?: AttachmentDirect[]; 
  deleted: boolean;
  currentUser: UserProfile;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  isReply: Boolean;
  replyId?: string;
  isContinious: Boolean;
};


const formSchema = z.object({
  content: z.string().min(1),
});

export const DirectMessageItem = ({
  id,
  content,
  UserProp,
  hasAttachment,
  attachmentsList,
  timestamp,
  deleted,
  currentUser,
  isUpdated,
  socketUrl,
  socketQuery,
  isContinious
}: ChatItemProps) => {
  const [activeId, setActiveId] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = usePrompt();

  // console.log("direct item",attachmentsList);
  const setActiveElementOnHover = () => {
    setActiveId(true);
  };

  const resetActiveElementOnLeave = () => {
    setActiveId(false);
  };

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
 
  // console.log("What the fuck");
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/direct-channel-edit`,
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
  }, [content,form]);

  const DATE_FORMAT_CONTINIOUS = "HH:mm";

  const isSender = currentUser.id === UserProp.id;
  const canDeleteMessage = !deleted && (isSender);
  const canEditMessage = !deleted && isSender ;

  const currentUserProp = currentUser;
  const directUserProp = UserProp;
  const { width } = useWindowDimensions();
 
  if(id)
  {
    return (

      <div
        className={`flex ${ (activeId) ? `bg-black/5` : `` }`}
        onMouseEnter={() => {setActiveElementOnHover()}}
        onMouseLeave={resetActiveElementOnLeave}
      >
      {isContinious && (
          <div
          className={`continiouschat `}
          style={{
            minWidth: (width<769) ? `${44}px` : `${56}px`,
            maxWidth: (width<769) ? `${44}px` : `${56}px`
          }}
          >
            {activeId && (
              <div
                className=""
              >
                {format(new Date(timestamp), DATE_FORMAT_CONTINIOUS)}
              </div>
              )
            }
          </div>
      )
      }
      {!isContinious && (
        <div
        className="pl-[8px] "
        >
        </div>
      )}   
        <div className={`relative group flex items-center w-full `}
          style={{
            overflowWrap: "break-word"
          }}
        >   
        {(!isContinious) && (
          <div className="group flex gap-x-2 items-start w-full">    
              <div 
                className="cursor-pointer hover:drop-shadow-md transition"
                onClick={()=>onOpen("UserProfileDisplay", {userProfilePropAPI:directUserProp, currentUserPropAPIID: currentUserProp.id },)}
              >
                <UserProfileAvatar src={directUserProp.imageUrl} />
              </div>
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-x-2">
                  <div className="flex items-center">
                    <p onClick={()=>onOpen("UserProfileDisplay", {userProfilePropAPI:directUserProp, currentUserPropAPIID: currentUserProp.id },)} className="font-semibold text-sm hover:underline cursor-pointer">
                      {UserProp.name}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {timestamp}
                  </span>
                </div>
                {(hasAttachment) &&
                  (
                      <FilesDisplay
                        directFileProps={attachmentsList}
                        isChannel={false}
                      />
                  )          
                }
              {!isEditing && (
                <div 
                className={              
                  `text-sm text-zinc-600 dark:text-zinc-300 ` 
              }
              style={{
                overflowWrap: "break-word",
                width: (width<769) ? `${width-80}px` : `${width-360}px`
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
                    style={{
                      overflowWrap: "break-word",
                      width: (width<769) ? `${width-80}px` : `${width-360}px`
                    }}
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
              <div 
              className={              
                `text-sm text-zinc-600 dark:text-zinc-300 ` 
            }
            style={{
              overflowWrap: "break-word",
              width: (width<769) ? `${width-80}px` : `${width-360}px`
            }}
            >
                {content}
                {isUpdated && !deleted && (
                  <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                    (edited)
                  </span>
                )}
                {(hasAttachment) &&
                (
                    <FilesDisplay
                      directFileProps={attachmentsList}
                      isChannel={false}
                    />
                )          
                }
              </div>
            )}
            {isEditing && (
              <Form {...form}>
                <form 
                  className="flex items-center w-full gap-x-2 pt-2"
                  style={{
                    overflowWrap: "break-word",
                    width: (width<769) ? `${width-80}px` : `${width-360}px`
                  }}
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
                  apiUrl: `${socketUrl}/direct-channel-delete`,
                  query: socketQuery,
                  messageId: id
                })}
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          </div>
        )}
      </div>
    </div> 
  )
  }
  // else
  // {
    
  // }
  
}
// }