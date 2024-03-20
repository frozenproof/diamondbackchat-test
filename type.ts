
import { Member, Server, UserProfile } from "@prisma/client";

export type ServerWithMembersWithProfiles = 
                                    Server & {
                                        members:(
                                            Member & {
                                                userProfile:UserProfile
                                            })[];
                                        }

export type ServerWithChannelsWithMembers = 
                                    Server & {
                                        members:(
                                            Member & {
                                                userProfile:UserProfile
                                            })[];
                                        }
