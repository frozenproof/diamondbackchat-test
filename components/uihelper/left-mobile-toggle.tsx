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

export const MobileNavigationLeftToggle = ({
  serverId,
  userName,
  userAvatar,
  userStatus
}: {
  serverId: string;
  userName: string;
  userAvatar: string;
  userStatus: UserStatus;
}) => {
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
          <ServerSideBar serverId={serverId} />
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