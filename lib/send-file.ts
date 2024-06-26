"use server"

import { currentUserProfile } from "./current-profile";
import { db } from "./db";

interface fileInterfaceProps
{
    url: string;
    type: string;
    name: string;
}
interface sendFileExtraProps  
{
    channelIdFile: string;
    userIdFile: string;
    typeSend: "sentMem" | "direct"; 
    resProp: fileInterfaceProps[]
}
export const sendFileExtra = async({
    channelIdFile,
    userIdFile,
    typeSend,
    resProp
}:  sendFileExtraProps) =>{
    
  const profile = await currentUserProfile()
  //  console.log("",channelIdFile);
   console.log("",userIdFile);

  //  console.log("",typeSend);
   console.log("resSendFileProp",resProp);
    if(!profile)
    {
      return
    }

    if(typeSend==="sentMem")
    {
      const channel = await db.channel.findFirst({
          where: {
            id: channelIdFile as string,
          }
        });
      
        if (!channel) {
          return null
        }
      
        const sendingFile = await db.message.create({
          data: {
            content:"",
            hasAttachment: true,
            channelId: channelIdFile as string,
            memberId: userIdFile as string,
            isReply: false
          },
        });
      
        for(let i=0;i<resProp.length;i++)
        {
          const attachmentFile = await db.attachmentChannel.create({
              data: {
                  messageId: sendingFile.id,
                  channelId: channelIdFile as string,
                  fileUrl: resProp[i].url as string,
                  type: resProp[i].type as string,
                  name: resProp[i].name as string
              }
            })
        }

        return sendingFile;
      }

      else if(typeSend==="direct")
      {
      if(profile.id != userIdFile)
      {
        return
      }

      const channel = await db.directChannel.findFirst({
          where: {
            id: channelIdFile as string,
          }
        });
      
        if (!channel) {
          return null
        }
      
        const sendingFile = await db.directMessage.create({
          data: {
            content:"",
            hasAttachment: true,
            directChannelId: channelIdFile as string,
            userProfileId: userIdFile as string,
            isReply: false
          },
        });
      
        for(let i=0;i<resProp.length;i++)
        {
          const attachmentFile = await db.attachmentDirect.create({
              data: {
                  directMessageId: sendingFile.id,
                  directChannelId: channelIdFile as string,
                  fileUrl: resProp[i].url as string,
                  type: resProp[i].type as string,
                  name: resProp[i].name as string
              }
            })
        }
        return sendingFile;
     }     
}