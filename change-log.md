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