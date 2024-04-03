import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { ServerSideBar } from "@/components/display/server/server-sidebar";
import { UserButtonDiamond } from "./user-button-diamond";
import { UserStatus } from "@prisma/client";
import { DirectSideBar } from "../display/direct/direct-sidebar";
import React, { Suspense } from "react";

export const MobileNavigationLeftToggle = async({
  serverId,
  userName,
  userAvatar,
  userStatus,
  userProfileIdProp,
}: {
  serverId?: string;
  userName: string;
  userAvatar: string;
  userStatus: UserStatus;
  userProfileIdProp: string;
}) => {

  console.log("wutmobiles",serverId?.toString);
  console.log("wutmobileu",userProfileIdProp?.toString);
  return (
    <Suspense>
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0 ">
        <div className="w-[72px]">
          <NavigationSideBar 
            userProfileIdNavigationSideBar={userProfileIdProp}
          />
        </div>
        <div
            className="flex flex-col w-full"
          >
            {(serverId) && 
              <ServerSideBar serverId={serverId} />
            }
            {(!serverId && userProfileIdProp) && (
                <DirectSideBar 
                    userProfileId={userProfileIdProp}
                />
              )
            }

        <UserButtonDiamond 
            name={userName}
            src={userAvatar}
            status={userStatus}
          />
        </div>
      </SheetContent>
    </Sheet>
    </Suspense>
  )
}

