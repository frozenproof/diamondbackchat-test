"use client";

import { ElementRef, Fragment, useEffect, useRef, useState } from "react";
import { Member, Message, UserProfile } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";

import { useChatQuery } from "@/hooks/use-chat-query";

import { ChatWelcome } from "../channel-welcome";
import { MessageWithMemberWithProfile, MessageWithMemberWithProfileEU, MessageWithMemberWithProfileWithFile, MessageWithProfile, MessageWithProfileWithFile } from "@/type";
import { DirectMessageItem } from "./direct-item";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

import { format } from "date-fns"
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ChatMessagesProps {
  name: string;
  currentMemberProp: UserProfile;
  directChatId?: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "directChannelId";
  paramValue: string;
  type: "channel" | "conversation";
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
  const [activeId, setActiveId] = useState("tis but")
  const queryKey = `chat:${directChatId}`;
  const addKey = `chat:${directChatId}:messages`;
  const updateKey = `chat:${directChatId}:messages:update` 

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
  const DATE_FORMAT_CONTINIOUS = "HH:mm";
  
  const setActiveElementOnHover = (id: string) => {
    setActiveId(id);
  };

  const resetActiveElementOnLeave = () => {
    setActiveId("");
  };

  useEffect(() => {
    console.log("somthing changed",data)
  },[data,fetchNextPage])
  // const testdata = data?.pages.map((group, i) => {group.items; console.log(i+"Test data",group.items)})
  // if(data)
  // console.log("Is this data",testdata);

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
            {group.items.map((message: MessageWithProfileWithFile,index: number,array: any) => 
            {
              var isContiniousCock = (message.userProfileId===(group.items[index+1]?.userProfileId));
              return (
              <div
                key={message.id}
                className={"flex"}
                onMouseEnter={() => setActiveElementOnHover(message.id)}
                onMouseLeave={resetActiveElementOnLeave}
                >
                  <div
                    style={
                        {
                          width: isContiniousCock ? "52px" : "0px"
                        }
                      }
                  >
                    {(activeId === message.id) && isContiniousCock && (
                          <div
                            className="continiouschat"
                          >
                            {format(new Date(message.createdAt), DATE_FORMAT_CONTINIOUS)}
                          </div>
                    )
                    }
                  </div>
              <DirectMessageItem
                key={message.id}
                id={message.id}
                currentMember={currentMemberProp}
                memberProp={message.userProfile}
                // userProp={message.member.userProfile}
                content={message.content}
                attachment={message.attachment}
                fileUrl=""
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.edited}
                // isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                isReply={false}
                replyId=""
                isContinious={isContiniousCock}
              />
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