"use server"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { currentUserProfile } from "@/lib/current-profile"
import { Trees, User } from "lucide-react"

const FriendsPage = async({
  
}) => {
  const profile = await currentUserProfile();
  
  // var friendList=;
  return (
    <Tabs 
      defaultValue="Online"
      className="w-full h-full">
      <TabsList className="grid w-full grid-cols-5">
        <div
          className="flex"
        >
            <Trees />
            Friends 
        </div>
        <TabsTrigger value="Online">Online</TabsTrigger>
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="Pending">Pending</TabsTrigger>
        <TabsTrigger value="Blocked">Blocked</TabsTrigger>
      </TabsList>
      <TabsContent value="Online">
        <Card>
          <CardHeader>
            <CardTitle>Friends who are online</CardTitle>
            <CardDescription>
              Anyone who is your friend and is online is displayed here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">

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

          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Pending">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">

          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Blocked">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">

          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default FriendsPage;