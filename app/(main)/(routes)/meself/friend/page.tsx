"use server"

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
import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar"
import { currentUserProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

import { cn } from "@/lib/utils"
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

  const allFriends = friends.filter((friend) => (friend.blocked === false && friend.pending === false ))
  const pendingFriends = friends.filter((friend) => (friend.blocked === false && friend.pending === true ))
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
            <div
              className="space-y-2 h-[280px] "
            >
              {allFriends.map((friendMember) => 
            {
              const whichFriend = (profile.id === friendMember.friendOneId) ? friendMember.friendTwo : friendMember.friendOne;
              if(whichFriend.status === "ONLINE")
              return(
                <div
                  key={whichFriend.id}
                  className="flex align-middle "
                >
                        <UserProfileAvatar 
                          src={whichFriend.imageUrl}
                          className="h-8 w-8 md:h-8 md:w-8"
                        />
                        <div
                          className={cn(
                            "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition justify-center align-middle h-full text-center"
                          )}
                        >
                          {whichFriend.name}
                        </div>
                </div>
              )
            }
            )}
            </div>          
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
          <div
              className="space-y-2 h-[280px] "
            >
              {allFriends.map((friendMember) => 
            {
              const whichFriend = (profile.id === friendMember.friendOneId) ? friendMember.friendTwo : friendMember.friendOne;
              return(
                <div
                  key={whichFriend.id}
                  className="flex align-middle "
                >
                  <UserProfileAvatar 
                    src={whichFriend.imageUrl}
                    className="h-8 w-8 md:h-8 md:w-8"
                  />
                  <div
                    className={cn(
                      "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition justify-center align-middle h-full text-center"
                    )}
                  >
                    {whichFriend.name}
                  </div>
                </div>
              )
            }
            )}
            </div> 
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
          <div
              className="space-y-2 h-full "
            >
              {pendingFriends.map((friendMember) => 
              {
                const whichFriend = (profile.id === friendMember.friendOneId) ? friendMember.friendTwo : friendMember.friendOne;
                return(
                  <div
                    key={whichFriend.id}
                    className="flex align-middle "
                  >
                    <UserProfileAvatar 
                      src={whichFriend.imageUrl}
                      className="h-8 w-8 md:h-8 md:w-8"
                    />
                    <div
                      className={
                        "font-semibold text-sm flex flex-row text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition "
                      }
                    >
                      <p
                        className="text-center pl-[18px] h-full"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                      >  
                        {whichFriend.name}
                      </p>
                    </div>
                    <div
                      className="ml-auto"
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                    >
                      <Cross  />
                    </div>
                  </div>
                )
              }
            )}
            </div> 
            
          </CardContent>

        </Card>
      </TabsContent>
      <TabsContent value="Blocked">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&#39;ll be logged out.
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