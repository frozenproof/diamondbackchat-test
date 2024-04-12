
import { Member, Message, Server, UserProfile ,AttachmentChannel, DirectMessage, DirectChannel, AttachmentDirect, Channel } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type ServerWithMembersWithProfiles = 
                                    Server & {
                                        Member:(
                                            Member & {
                                                userProfile:UserProfile
                                            })[];
                                        }

export type MemberWithProfile = Member & {
                                        userProfile:UserProfile
                                    };
export type DirectChannelWithProfile = DirectChannel & {
                                      memberOne: UserProfile,
                                      memberTwo: UserProfile
                                    }
export type NextApiResponseServerIo = 
    NextApiResponse & {
        socket: Socket & {
            server: NetServer & {
            io: SocketIOServer;
            };
        };
    };

export type MessageWithMemberWithProfileWithFile = Message & {
        member: Member & {
          userProfile: UserProfile
        };
        AttachmentChannel: AttachmentChannel[];
      } 

export type MessageWithProfileWithFile = DirectMessage & {
  userProfile: UserProfile ; 
  AttachmentDirect : AttachmentDirect[];
};
         

     
export type MessageWithMemberWithProfileEU = Message & {
    member: Member  
    userProfile: UserProfile
  };

 
export type ServerWithChannels = Server & {
  Channel: Channel[]
};