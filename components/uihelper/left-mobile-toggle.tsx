import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";

import { UserButtonDiamond } from "./user-button-diamond";
import { UserProfile, UserStatus } from "@prisma/client";

import React, { Suspense } from "react";
import { NavigationHeavyLoad } from "../optimization/navigation-side-toggle";

export const MobileNavigationLeftToggle = ({
  serverId,
  userProfileProp
}: {
  serverId?: string;
  userProfileProp: UserProfile;
}) => {

  // console.log("wutmobiles",serverId?.toString);
  // console.log("wutmobileu",userProfileIdProp?.toString);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0 ">
        <div className="w-[72px]">
          <NavigationSideBar 
            userProfileIdNavigationSideBar={userProfileProp.id}
          />
        </div>
        <div
          className="flex flex-col w-full h-full"
        >
        <Suspense
          fallback={
            <div>
              Loading sidebar
            </div>
          }
        >
          <NavigationHeavyLoad 
              userProfileIdProp={userProfileProp.id}
              serverId={serverId}
          />          
        </Suspense>
        <div
        className="mt-auto"
        >
          <UserButtonDiamond 
            currentUserProfile={userProfileProp}
          />
        </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

