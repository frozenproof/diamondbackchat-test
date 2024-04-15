"use server"

import FriendProfileComponent from "@/components/display/friend-profile"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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


import { Cross, Trees, User, X } from "lucide-react"
import { redirect } from "next/navigation"


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

  const allFriends = friends.filter((friend) => (friend.pending === false ))
  const pendingFriends = friends.filter((friend) => (friend.pending === true ))
  return (
    <Tabs 
      defaultValue="Online"
      className="w-full ">
      <TabsList className="grid w-full grid-cols-6">
        <MobileNavigationLeftToggle 
          userAvatar={profile.imageUrl}
          userName={profile.name}
          userStatus={profile.status}
          userProfileIdProp={profile.id}
          userAbout={profile.about}
        />
        <div
          className="flex"
          style={
            {
              overflowWrap: "break-word"
            }
          }
        >
            <Trees />
            Friends 
        </div>
        <TabsTrigger value="Online">Online</TabsTrigger>
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="Pending">Pending</TabsTrigger>
        <TabsTrigger value="Blocked">Blocked</TabsTrigger>
      </TabsList>
      <TabsContent value="Online" 
        className="h-full"
      >
        <Card
          className="h-full"
        >
          <CardHeader>
            <CardTitle>Friends who are online</CardTitle>
            <CardDescription>
              Anyone who is your friend and is online is displayed here
            </CardDescription>
          </CardHeader>
          <CardContent >
          <FriendProfileComponent
              pageFriendsProp={allFriends}
              profileId={profile.id}
            />   
          </CardContent>
        </Card>
      </TabsContent>
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

          </CardContent>

        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default FriendsPage;