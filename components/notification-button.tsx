"use client"

import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Popover } from "./ui/popover"
import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { useSocket } from "./providers/socket-provider"
import { useEffect } from "react"
import { UserProfile } from "@prisma/client"
import { useToast } from "./ui/use-toast"

interface NotificationButtonProps {
    userSocketId: string;
}

export const NotificationButton = (
    {userSocketId} : NotificationButtonProps
) => {
    const {socketActual} = useSocket();
    const { toast } = useToast()

    let tempNotifications: string[] = [];
    var renderedOutput;
    if (!socketActual) {
        console.log("Socket is not running")
        return;
    }

    useEffect(() => {
        console.log("UserSocket?");

        renderedOutput = tempNotifications.map(item => <div> {item} </div>);

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
                duration: 1008,
                description: otherUserRequest.name+` is calling you`,
              })
            tempNotifications.push(otherUserRequest.name+` is calling you`)
        })
        
        socketActual.on(userSocketId, (socketId : string,testString: string,ACK: string) => {
            console.log("Connected on ",socketId);
            console.log("Message is ",testString);
        })
        
    return () => {
        socketActual.off("calling_user_"+userSocketId);
        socketActual.off(userSocketId);
      }
    },[userSocketId,socketActual,renderedOutput,tempNotifications])

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
                    </CardHeader>
                    <CardContent>
                        <div
                            style={{
                                height: "200px",
                                overflow: "scroll"
                            }}
                            // className="bg-[#e78888]"
                        >
                            {renderedOutput}
                        </div>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    )
}