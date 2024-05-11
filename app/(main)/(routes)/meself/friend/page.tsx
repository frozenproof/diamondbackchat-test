"use server"

import BlockProfileComponent from "@/components/display/many-aux/block-profile"
import FriendProfileComponent from "@/components/display/many-aux/friend-profile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { MobileNavigationLeftToggle } from "@/components/uihelper/left-mobile-toggle"

import { currentUserProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"


import { Trees, } from "lucide-react"
import { redirect } from "next/navigation"

export async function generateMetadata(
  ) {
    return {
      title: "Friends",
    }
}
const FriendsPage = async({
  
}) => {
  const profile = await currentUserProfile();
  if(!profile)
  {
    return redirect(`/`);
  }
  const direct = await db.directChannel.findMany({
    where: {
      OR: [
        {memberOneId: profile.id},
        {memberTwoId: profile.id}
      ]
    },
    include: {
      memberOne: true,
      memberTwo: true
    }
  });

  if (!direct) {
    return redirect(`/meself/friend`);
  }

  // console.log(profile.id)
  const friends = await db.friend.findMany(
    {
      where: {
        OR: [
          {friendOneId: profile.id},
          {friendTwoId: profile.id}
        ],
      },
      include: {
        friendOne: true,
        friendTwo: true
      }
    }
  )

  const blocked = await db.block.findMany({
    where: {
      blockerId: profile.id
    },
    include: {
      blocker: true,
      blocked: true
    }
  })
  const allFriends = friends.filter((friend) => (friend.pending === false ))
  const pendingFriends = friends.filter((friend) => (friend.pending === true ))
  return (
    <Tabs 
      defaultValue="All"
      className="w-full ">
      <TabsList className="grid w-full grid-cols-6">
        <MobileNavigationLeftToggle 
          userProfileProp={profile}
        />
        <div
          className="flex"
          style={
            {
              overflowWrap: "break-word",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }
        >
            <Trees />
            Friends 
        </div>
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="Pending">Pending</TabsTrigger>
        <TabsTrigger value="Blocked">Blocked</TabsTrigger>
      </TabsList>
      <TabsContent value="All">
        <Card>
          <CardHeader>
            <CardTitle>All friends</CardTitle>
            <CardDescription>
              All friends are displayed here .
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">

          <FriendProfileComponent
              pageFriendsProp={allFriends}
              profileId={profile.id}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Pending">
        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
            <CardDescription>
              People are busy , so be patient ! A friend is forever and ever .
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FriendProfileComponent
              pageFriendsProp={pendingFriends}
              profileId={profile.id}
            />          
          </CardContent>

        </Card>
      </TabsContent>
      <TabsContent value="Blocked">
        <Card>
          <CardHeader>
            <CardTitle>Blocked</CardTitle>
            <CardDescription>
              Got some beefs with someone , now you are in the battlefield .
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <BlockProfileComponent 
              pageFriendsProp={blocked}
              profileId={profile.id}
            />
          </CardContent>

        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default FriendsPage;