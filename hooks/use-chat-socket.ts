import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Member, Message, UserProfile } from "@prisma/client";

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

    console.log("this is running socket")
    socketActual.on(updateKey, (message: MessageWithMemberWithProfile) => {
      console.log(`update key`)
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

    socketActual.on(addKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{
              items: [message],
            }]
          }
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          items: [
            message,
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
    }
  }, [queryClient, addKey, queryKey, socketActual, updateKey]);
}