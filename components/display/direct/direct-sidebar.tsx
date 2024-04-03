// "use server"

import { DirectChannel,  UserProfile } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile"
import DirectSideBarHeader from "@/components/extra/direct-sidebar-header";
import { DirectChannelItem } from "./direct-item";

import { getAllDirectChannel } from "@/lib/direct-search";


interface DirectSideBarProps {
  userProfileId?: string;
  }

export const DirectSideBar = async({
  userProfileId
}: DirectSideBarProps) => {

    if(!userProfileId)
    {
      return redirect(`/`);
    }
    const directChannelProp = await getAllDirectChannel(userProfileId);
    // console.log(`Channel arrays`,direct);
    if (!directChannelProp) {
      return redirect(`/meself/friend`);
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
                    const userAuth = (channel.memberOneId === userProfileId);
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