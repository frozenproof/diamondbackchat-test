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

