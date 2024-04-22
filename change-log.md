# 14/4
- Added change log
- Changed not found to increase loading speed
- Changed sending route to ignore the res 
- Changed friend page to actually reflect the status
- Socket instance attempted to change path to server
- Server attempted to change path to server
- Schema added main app server status for future deployment 
- useChatSocket is now functional to avoid consuming requests

- type now reflect better data type
- removed this completely because we are handling events on our own .
```
    import { Server as NetServer, Socket } from "net";
    import { NextApiResponse } from "next";
    import { Server as SocketIOServer } from "socket.io";

    export type NextApiResponseServerIo = 
    NextApiResponse & {
        socket: Socket & {
            server: NetServer & {
            io: SocketIOServer;
            };
        };
    };
```
- removed this because we don't use them
```
    export type MessageWithMemberWithProfileEU = Message & {
    member: Member  
    userProfile: UserProfile
  };

```
- usechatsocket switched to catch all, which is very dangerous , but we have to deal with it
- send file havent added the check for query yet , we just have to trust the process 
- direct list and direct input now added chat socket , haven't found the reason for the input rendering whenever input is changed
- all files uploads are paralyzed without changes , now I'm confused . Is custom server causing this ? seems to be the case . then how do i fix it ? but why ? it randomly work sometime and throw time out error .
- changed server page to reduce load
- added backup for original upload file
- direct and channel both have channel type send to server when sending a message
- file display now actually have a proper fallback
- optimized channel send route and direct send route to actually include only certain fields , fixed 
- removed unused function from message item page
- removed the pages folder and subdirectories as the socket server is now the proper handler
- server mjs is upgraded and now can handle both direct and channel send emit
- fixed a type in [directChatId]/page , where the id is wrong
- user profile prompt is working without profile from message, which is interesting
- removed unused form in user profile prompt
- changed redirect from leave server prompt
- added extra display for files display , need to upgrade database to get item name

- added name for the database for file schema
- removed unnecessary import in navigation side toggle
- send file updated to add name to database
- added video call button to direct chat
- added channel update listener in server mjs
- disabled all rules check for npm build 
- changed livekit token api route and channel page to actually reflect member nickname or real username depends on which channel is calling 

- added video display for message item , optimized files into interface

- added friend lib
- added friend request api
- added friend request , but is using a static string as api route , which is fine but need to be changed when deployed
- added proper fall back for navigation item image
- user profile prompt is upgraded for friend request, which is compulsory for user

- added port support for render deployment
- need to change configuration inside the server mjs for every deployment

# 15/4
- changed server js into server-back js to avoid wrong server file
- added two routes for user setting and api for status
- multi-file-upload regressed to file-upload different route due to the libraries breaking 
- deleted multi file router for now, we can use the original api route because we don't need to serve the file in different router 
- updated both uploadthing/react and uploadthing to newest version , hoping they don't break before the presentation for the final project
- included the multi-file route in the core for the uploadthing router

- added extra type for friend page rendering
- changed friend page display
- user profile popover removed unused variable
- message item removed unused import
- removed backup for older invite route
- added server mjs improvement for deployment
- added friend page component to seperate rendering and layout 
- ready for deployment test
- temporary added a friend confirm api route, need to complete tomorrow
- the env is not loaded in when entry point of app is run

# 16/4
- added proper fallback for directChatId Page Search
- removed unused import from channel Page
- added proper user about for all user button diamond , which requested from mobile toggle , which got requested from channel and direct channel header
- create server prompt added better suggestion for users
- changed role api to allow actual users to change roles based on their member role
- added user setting prompt
- added route for user setting
- added route for member nickname

- update friend lib to accept both request to save memory
- added block entity as an separate entity from friend
- changed friend page to reflect new database friend model

- added proper support for member nickname edit
- strange bug with query string import

- added user status control
- added user status route
- added more roles for member manage prompt
- user button now function
- added user status for enum user status in prisma
- updated friend lib to reflect real database
- removed unused user profile unused prompt

# 17/4
- changed user profile prompt condition to avoid hacking and confusion
- removed unused import
- friend lib is upgraded
- initial profile added default fallback
- member item now has user profile prompt loaded
- friend profile now can confirm friend request
- removed back up for multi file upload
- channel header updated to send information
- added information to member side bar 

- changed member delete
- added display condition for friends list
- updated invite api route to change member deletion status where possible
- member side bar now display properly who is still in the server
- removed unused import from message input
- removed online friend page until we have a better solution
- put the video call for direct call as an overlay for the original chat to make sure its accessible
- removed unused packages
- added video call socket 

# 18/4
- direct call now work
- updated media room to auto fill
- majority of functionalities are now ready for users 
- basically reformed the entire user button
- changed the user profile prompt for better user 
- improved edit prompt to keep the data when needed
- removed back up for server js
- optimized components to make them readable 
- ready for deployment

- removed unused variable to save system build time

- upgraded search bar to display more information

# 19/4
- added block and unblock route
- upgraded database
- added block function for profile prompt
- added unfriend route
- added friend lib upgrade
- added unfriend button to friend profile
- added unblock function to block profile
- added new type for data
- fixed edit server prompt
- added improvement to user setting
- removed unused console.log
- added ban check when using invite link

- upgraded database
- added proper database for block page
- virus detected

# 20/4
- added notification button 
- optimized video call button

- added ban / unban api route
- manage member prompt added ban function
- server header added unban section
- prompt data added another prop
- direct search now check for blocks
- prompt store added api prop for banned list
- added unban function
- added a new prompt

- added direct exception handler for direct request
- added return handler for direct message request
- ready for deployment 2.0
- LETS FUCKING GO

# 21/4
- added proper foreign key for message replies
- middleware need to be updated on every deploy
- message list and direct list now added continious check with time
- added reply component

# 22/4
- fixed wrong channel data for channels list
- removed channel dynamic route api due to inefficiency in compile
- added static channel api route
- message item included reply functionality but not working
- added toast for message sending instead of forcing users to wait for message sending
- lucide-x is now visible 
- notification button is fixed where async is unallowed in client component
- middleware is set back to original req.url for redirection

- changed all server api route to static route

- changed invite api route to static
- changed friend api route to static
- changed member api route to ......
- all routes are now static to preserve server ram
- removed unused file
- added better host handling with env variable

- moved all aux front end component into a more managable folder

