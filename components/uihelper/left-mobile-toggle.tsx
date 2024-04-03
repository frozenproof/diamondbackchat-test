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
import { DirectChannel, UserProfile, UserStatus } from "@prisma/client";
import { DirectSideBar } from "../display/direct/direct-sidebar";
import React from "react";

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
  userProfileIdProp?: string;
}) => {

  console.log("wutmobiles",serverId?.toString);
  console.log("wutmobileu",userProfileIdProp?.toString);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0 ">
        <div className="w-[72px]">
          <NavigationSideBar />
        </div>
        <div
            className="flex flex-col w-full"
          >
            {(serverId) && 
              <ServerSideBar serverId={serverId} />
            }
            {(!serverId) && (
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
  )
}

const ChildComponent = () => {
  console.log('I re-rendered');
  return <p>Child</p>;
};

const ParentComponent = ( children?: React.ReactNode ) => {
  return (
    <div>
        {children}
    </div>
  );
};
