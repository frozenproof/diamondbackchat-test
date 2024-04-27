"use client"

import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Popover } from "./ui/popover"
import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { useSocket } from "./providers/socket-provider"
import { ElementRef, useEffect, useRef } from "react"
import { UserNotification, UserProfile } from "@prisma/client"
import { useToast } from "./ui/use-toast"

interface NotificationButtonProps {
    userSocketId: string;
    notificationProp: UserNotification[];
}

export const NotificationButton = (
    {userSocketId,notificationProp} : NotificationButtonProps
) => {
    const {socketActual} = useSocket();
    const { toast } = useToast()

    var tempNotificationsRender;

    useEffect(() => {
        if (!socketActual) {
            console.log("Socket is not running")
            return;
        }
        
        // console.log("UserSocket?");
        socketActual.emit("personal-subcribe",userSocketId);
        
        // socketActual.onAny((event: any, ...args: any) => {
        //     console.log(`got ${event}`);
        //     console.log(`data from real notification socket is ${args}`);
        //     // console.log("this is listened by use-chat-socket",addKey,updateKey,queryKey)
        //   }); 

        socketActual.on("calling_user_"+userSocketId, (otherUserRequest : UserProfile,ACK: string) => {
            console.log("Other user on ",otherUserRequest);
            console.log("Message is calling",ACK);
            toast({
                duration: 2808,
                description: otherUserRequest.name+` is calling you`,
              })
        })
        
        socketActual.on(userSocketId, (socketId : string,testString: string,ACK: string) => {
            console.log("Connected on ",socketId);
            console.log("Message is ",testString);
        })
        
    return () => {
        socketActual.off("calling_user_"+userSocketId);
        socketActual.off(userSocketId);
      }
    },[userSocketId,socketActual,notificationProp])

    return (
        <Popover>
            <PopoverTrigger>
                <Bell />
            </PopoverTrigger>
            <PopoverContent
                      side="top" 
                      // sideOffset={0}
                      className="bg-transparent w-[280px]"
                      >
                <Card>
                    <CardHeader
                        className="flex"
                        style={{
                            fontSize: "12px"
                        }}
                    >
                        Your notifications will only last for a day .
                        <br/>
                        Read them before they are gone forever .
                        <br/>
                    </CardHeader>
                    <CardContent>
                        <div
                            style={{
                                height: "200px",
                                overflowY: "scroll",
                                border: "2px",
                                borderBlockColor: "red",
                                borderColor: "blue",
                                borderBlock: "true"
                            }}
                            // className="bg-[#e78888]"
                        >
                            {notificationProp.map(item => <div
                                key={item.id}
                            > 
                                {item.data} 
                                <div                               
                                >
                                    Read
                                </div>    
                            </div>)
                            }   
                   
                        </div>
                        <br/>

                        <div                               
                            >
                            Mark all as read
                        </div>     
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    )
}