"use server"

import { redirect } from "next/navigation";

import DirectSideBarHeader from "@/components/extra/direct-sidebar-header";
import { DirectChannelItem } from "@/components/display/direct/direct-item";

import { db } from "@/lib/db";


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
    // const directChannelProp = await findAllDirectChannel(userProfileId);
    // cai nay gay ra bug reload vo han
    // ly do la ham async chi phu hop khi nguoi dung yeu cau , chu khong phai khi render

    const directChannelProp = await db.directChannel.findMany({
      where: {
        OR: [
          { memberOneId: userProfileId },
          { memberTwoId: userProfileId },          
        ]
        ,
        deleted: false
      },
      include: {
        memberOne: true,
        memberTwo: true
      }
    });
    // console.log(`Channel arrays`,direct);
    if (!directChannelProp) {
      return redirect(`/meself/friend`);
    }   
    if(directChannelProp)
    return (
      <div
        className="dark:bg-[#000000]"
      >
        <DirectSideBarHeader 
        />
          <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-[#f1f1f1] pt-[8px] text-center align-middle dark:bg-[#000000]">
            Direct Channels
          </p>       
        {!!directChannelProp?.length && (
              <div className="mb-2 dark:bg-[#000000]">
                <div className="space-y-[2px] dark:bg-[#000000]">
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