"use client";

import { ElementRef, Fragment, useEffect, useRef, useState } from "react";
import { Loader2, ServerCrash } from "lucide-react";

import { useChatQuery } from "@/hooks/use-chat-query";

import { ChatWelcome } from "../channel-welcome";
import { MemberWithProfile,  MessageWithMemberWithProfileWithFile } from "@/type";
import { MessageItem } from "./message-item";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { format } from "date-fns"

interface ChatMessagesProps {
  name: string;
  memberProp: MemberWithProfile;
  channelChatId?: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "directChannelId";
  paramValue: string;
  type: "channel" | "direct";
}

export const ChatMessagesList = ({
  name,
  memberProp,
  channelChatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const [activeId, setActiveId] = useState("tis but");
  const queryKey = `chat:${channelChatId}`;
  const { height, width } = useWindowDimensions();

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
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  })
  const DATE_FORMAT = "d MMM yyyy, HH:mm";
  const DATE_FORMAT_CONTINIOUS = "HH:mm";
  
  const setActiveElementOnHover = (id: string) => {
    setActiveId(id);
  };

  const resetActiveElementOnLeave = () => {
    setActiveId("");
  };

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
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Lmao get rekt by this horrible design
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
            {group.items.map((message: MessageWithMemberWithProfileWithFile,index: number,array: any) => 
            {
              var isContiniousCock = (message.memberId===(group.items[index+1]?.memberId));
              var isActiveItem = (activeId === message.id)
              // console.log("this is message list file",message.AttachmentChannel)
              return (
                <div
                  key={message.id}
                >
                  <div
                  className={`${ (!isContiniousCock) ? `h-[8px] pl-[8px] ` : `hidden` }`}
                  >
                    
                  </div>
                  <div
                    className={`flex ${ (isActiveItem) ? `bg-black/5` : `` }`}
                    onMouseEnter={() => setActiveElementOnHover(message.id)}
                    onMouseLeave={resetActiveElementOnLeave}
                    >
                    {isContiniousCock && (
                          <div
                            className={`continiouschat `}
                            style={{
                              minWidth: (width<769) ? `${44}px` : `${56}px`,
                              maxWidth: (width<769) ? `${44}px` : `${56}px`
                            }}
                          >
                            {isActiveItem && (
                              <div
                                className=""
                              >
                                {format(new Date(message.createdAt), DATE_FORMAT_CONTINIOUS)}
                              </div>
                              )
                            }
                          </div>
                    )
                    }
                    {!isContiniousCock && (
                      <div
                        className="pl-[8px] "
                      >
                        </div>
                    )}
                    <MessageItem
                      key={message.id}
                      id={message.id}
                      currentUserMember={memberProp}
                      currentMessageMemberProp={message.member}
                      // userProp={message.member.userProfile}
                      content={message.content}
                      hasAttachment={message.hasAttachment}
                      fileUrl=""
                      deleted={message.deleted}
                      timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                      // isUpdated={message.edited}
                      attachmentsList={message.AttachmentChannel} 
                      isUpdated={message.updatedAt !== message.createdAt}
                      socketUrl={socketUrl}
                      socketQuery={socketQuery}
                      isReply={false}
                      replyId=""
                      isContinious={isContiniousCock}
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