"use client"

import { ElementRef, Fragment, useRef } from "react";
import { UserProfile } from "@prisma/client";
import { Loader2, ServerCrashIcon } from "lucide-react";

import { useChatQuery } from "@/hooks/use-chat-query";

import { ChatWelcome } from "../many-aux/channel-welcome";
import { DirectMessageWithProfileWithFile } from "@/type";
import { DirectMessageItem } from "./direct-item";

import { useChatScroll } from "@/hooks/use-chat-scroll";

import { differenceInMinutes, format } from "date-fns";
import { useChatSocket } from "@/hooks/use-chat-socket";

interface ChatMessagesProps {
  name: string;
  currentMemberProp: UserProfile;
  directChatId?: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "directChannelId";
  paramValue: string;
  type: "channel" | "direct";
}

export const DirectChatMessages = ({
  name,
  currentMemberProp,
  directChatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  // console.log("DirectChatMessages");
  const queryKey = `chat:${directChatId}`;
  const addKey = `chat:${directChatId}:messages`;
  const updateKey = `chat:${directChatId}:update`; 

  console.log("after useWindowDimensions")
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });
  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  })
  const DATE_FORMAT = "d MMM yyyy, HH:mm";
  
  if (status === "loading") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Is this loading running ?
        </p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrashIcon className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          It seems you are disconnected
        </p>
      </div>
    )
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && (
        <ChatWelcome
          type={type}
          name={name}
        />
      )}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
        <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          //data la snippet cua database
          //pages la array cac snipper
          //group la du lieu that
          
          <Fragment key={i}>
            {group.items.map((message: DirectMessageWithProfileWithFile,index: number) => 
            {
              var isContiniousCock = (message.userProfileId===(group.items[index+1]?.userProfileId));
              if(group.items[index+1])
              {
                var date_thisMessage2 = group.items[index+1]?.createdAt;

                var date_thisMessage = message.createdAt;
                if(date_thisMessage2)
                isContiniousCock = ( isContiniousCock && (Math.abs((differenceInMinutes(date_thisMessage2,date_thisMessage))) < 20))
              }
              let messageReplyId = message.messageParentId as string | undefined;
              
              return (
                <div
                  key={message.id}
                >
                  <div
                  className={`${ (!isContiniousCock) ? `h-[8px] pl-[8px] ` : `hidden` } `}
                  >
                    
                  </div>
                  <div
                    className={`flex `}
                    >
                      
                    <DirectMessageItem
                      key={message.id}
                      id={message.id}
                      currentUser={currentMemberProp}
                      UserProp={message.userProfile}
                      // userProp={message.member.userProfile}
                      content={message.content}
                      hasAttachment={message.hasAttachment}
                      attachmentsList={message.AttachmentDirect}
                      deleted={message.deleted}
                      timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                      isUpdated={message.edited}
                      // isUpdated={message.updatedAt !== message.createdAt}
                      socketUrl={socketUrl}
                      socketQuery={socketQuery}
                      isReply={message.isReply}
                      replyMessage={message.messageParent}
                      isContinious={isContiniousCock}
                      channelId={message.directChannelId}
                    />
                </div>
              </div>
              )}
            )}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
      </div>
  )
}