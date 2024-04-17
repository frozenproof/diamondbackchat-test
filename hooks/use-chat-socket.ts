"use client"

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DirectMessage, Member, Message, UserProfile } from "@prisma/client";

import { useSocket } from "@/components/providers/socket-provider";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
}

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: UserProfile;
  }
}

type DirectMessageWithProfile = DirectMessage & {
  userProfile: UserProfile ; 
}
export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey
}: ChatSocketProps) => {
  const { socketActual } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("UseChatSocket?");
    if (!socketActual) {
      console.log("Socket is not running")
      return;
    }

    socketActual.onAny((event: any, ...args: any) => {
      console.log(`got ${event}`);
      console.log(`data from real chat socket is ${args}`);
      // console.log("this is listened by use-chat-socket",addKey,updateKey,queryKey)
    });

    socketActual.on("forced_popup",(arg1: any) => {
      console.log("GOT THE MESSAGE");
    })
  
    socketActual.on(updateKey, (message: MessageWithMemberWithProfile,typesend: string) => {
      console.log(`we are updated`)
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            })
          }
        });

        return {
          ...oldData,
          pages: newData,
        }
      })
    });

    socketActual.on(addKey, (message: any,typesend: string) => {
      console.log("we heard you, this actually just take items as they are items without types, so we added the type as additional respond ", typesend)
      var messageReal: MessageWithMemberWithProfile | DirectMessageWithProfile;
      if(typesend === "server-channel")
      {
        messageReal = message as MessageWithMemberWithProfile;
      }
      else if(typesend === "direct-input")
      {
        messageReal = message as DirectMessageWithProfile;
      }
      console.log("chat socket is saying",message)
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{
              items: [messageReal],
            }]
          }
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          items: [
            messageReal,
            ...newData[0].items,
          ]
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
      
    });

    return () => {
      socketActual.off(addKey);
      socketActual.off(updateKey);
      socketActual.off("forced_popup");
      socketActual.off();
    }
  }, [queryClient, addKey, queryKey, socketActual, updateKey]);
}