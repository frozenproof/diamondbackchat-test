"use client"

import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Popover } from "./ui/popover"
import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"

export const NotificationButton = () => {
    
    function NotificationRing(NotificationData: string) {

    }

    const notification = "";

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
                            }}
                            className="bg-[#e78888]"
                        >

                        </div>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    )
}