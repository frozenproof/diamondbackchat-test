"use client";

import { useEffect, useState } from "react";
import { ControlBar, GridLayout, LiveKitRoom, ParticipantTile, PreJoin, RoomAudioRenderer, VideoConference, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";

import { Loader2 } from "lucide-react";
import { Track } from "livekit-client";
import { MediaRoomDirect } from "@/components/livekit-call-room";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  userIdProp: string;
};

const MediaRoom = ({
  chatId,
  video,
  audio,
  userIdProp
}: MediaRoomProps) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const name = userIdProp;
        const resp = await fetch(
          `/api/livekit-participate-token?room=${chatId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userIdProp]);
  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2
          className="h-7 w-7 text-zinc-500 animate-spin my-4"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Loading {process.env.NEXT_PUBLIC_LIVEKIT_URL}
        </p>
      </div>
    )
  }

  return (
      <LiveKitRoom
      token={token}
      video={video}
      audio={audio}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <VideoConference />

    </LiveKitRoom>
  )
}

const DirectCallPage = (
    {channelChatId} : {channelChatId: string}
) => {
    return ( 
        <div>
            <MediaRoomDirect
              chatId={channelChatId}
              video={false}
              audio={true}
            />
        </div>
     );
}
 
export default DirectCallPage;