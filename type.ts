
import { Member, Message, Server, UserProfile ,AttachmentChannel, DirectMessage } from "@prisma/client";
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

export type NextApiResponseServerIo = 
    NextApiResponse & {
        socket: Socket & {
            server: NetServer & {
            io: SocketIOServer;
            };
        };
    };

export type MessageWithMemberWithProfile = Message & {
        member: Member & {
          userProfile: UserProfile
        }
      };

export type MessageWithMemberWithProfileWithFile = Message & {
        member: Member & {
          userProfile: UserProfile
        }
      } & AttachmentChannel[];

export type MessageWithProfileWithFile = DirectMessage & {
  userProfile: UserProfile & AttachmentChannel[];
}
         

     
export type MessageWithMemberWithProfileEU = Message & {
    member: Member  
    userProfile: UserProfile
  };

export type MessageWithProfile = Message & {
        userProfile: UserProfile
    };     