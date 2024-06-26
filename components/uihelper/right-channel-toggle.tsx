import { User } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { MemberSideBar } from "../display/member/member-sidebar";
import { MemberWithProfile } from "@/type";

export const RightChannelToggle = ({
    anotherMemberProp,
    userProfileIdProp

}: {
  anotherMemberProp: MemberWithProfile[];
  userProfileIdProp: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto">
          <User />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 flex gap-0 ">
        <MemberSideBar 
            memberProp={anotherMemberProp}
            userProfileIdProp={userProfileIdProp}
        />
      </SheetContent>
    </Sheet>
  )
}