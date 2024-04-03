// "use server"

import { DirectChannel,  UserProfile } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"
import DirectSideBarHeader from "@/components/extra/direct-sidebar-header";
import { DirectChannelItem } from "./direct-item";
import { useEffect } from "react";


interface DirectSideBarProps {
    directChannelProp?: (DirectChannel & {
      memberOne: UserProfile,
      memberTwo: UserProfile
    })[],
  }

export const DirectSideBar = async({
  directChannelProp
}: DirectSideBarProps) => {
    const profile = await currentUserProfile();
    if(!profile){
        redirect("/");
    }

    if(directChannelProp)
    return (
      <div>
        <DirectSideBarHeader 
        />
        {!!directChannelProp?.length && (
              <div className="mb-2">
                <div className="space-y-[2px]">
                  {directChannelProp.map((channel) => 
                  {
                    const userAuth = (channel.memberOneId === profile.id);
                    return (
                    <DirectChannelItem
                      key={channel.id}
                      directChannelProp={channel}
                      nameProp={ userAuth ? channel.memberTwo.name : channel.memberOne.name}
                      avatarProp={userAuth ? channel.memberTwo.imageUrl : channel.memberOne.imageUrl}
                    />)
                    })}
                </div>
              </div>
            )}
      </div>
    )
}