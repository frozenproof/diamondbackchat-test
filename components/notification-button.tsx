"use client"

import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Popover } from "./ui/popover"
import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { useSocket } from "./providers/socket-provider"
import { useEffect  } from "react"
import { UserNotification, UserProfile } from "@prisma/client"
import { useToast } from "./ui/use-toast"
import qs from "query-string";
import axios from "axios"
import { useRouter } from "next/navigation"

interface NotificationButtonProps {
    userSocketId: string;
    notificationProp: UserNotification[];
}

export const NotificationButton = (
    {userSocketId,notificationProp} : NotificationButtonProps
) => {
    const {socketActual} = useSocket();
    const { toast } = useToast()
    const router = useRouter();

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
                duration: 8888,
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

    async function buttonReadAll (){
        const url = qs.stringifyUrl({
            url: "/api/user/notice-api",
          });
        
          const response = await axios.patch(url, {typeRead: "DELETE"}).then();
        
          router.refresh();
    }
    return (
        <Popover
            onOpenChange={async function temp(){
                if(notificationProp.filter(x => x.isRead === false).length !== 0)
                {
                    const url = qs.stringifyUrl({
                        url: "/api/user/notice-api",
                      });
                
                    const response = await axios.patch(url, {typeRead: "ALL"}).then();
                
                    router.refresh();
                }               
            }}
        >
            <PopoverTrigger>
                <div
                    className=""
                >
                    <Bell />
                    {notificationProp.filter(item => item.isRead === false).length}
                </div>
            </PopoverTrigger>
            <PopoverContent
                      side="top" 
                      // sideOffset={0}
                      className="bg-transparent w-[280px]"
                      >
                <Card
                    // className=" dark:bg-[#128398]"
                >
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
                            }}
                        >
                            {notificationProp.map(item => {
                            
                            return(
                            <div
                                key={item.id}
                            > 
                                {item.data} 
                                {
                                    <button className="button-53" role="button">
                                    Delete
                                    </button>
                                }                                
                            </div>)
                            }
                            
                            )
                            }   
                   
                        </div>
                        <br/>
                          
                        <button     
                            onClick={buttonReadAll}
                            className="button-49"                 
                            >
                            Clear all notifications
                        </button>     
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    )
}