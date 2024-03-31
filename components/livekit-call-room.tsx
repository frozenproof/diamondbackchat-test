"use client";

import { useEffect, useState } from "react";
import { GridLayout, LiveKitRoom, ParticipantTile, VideoConference, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Track } from "livekit-client";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  userIdProp: string;
};

export const MediaRoom = ({
  chatId,
  video,
  audio,
  userIdProp
}: MediaRoomProps) => {
  const profile = useUser();
  const [tokenState, setTokenState] = useState("");
  var nameUser;

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`/api/livekit-create-token?room=${chatId}&username=${userIdProp}`);
        const data = await resp.json();
        nameUser = data.token;
        console.log("token is ",nameUser)
      } catch (e) {
        console.log(e);
      }
    })()
  }, [nameUser,chatId]);

  if (nameUser === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2
          className="h-7 w-7 text-zinc-500 animate-spin my-4"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading...
        </p>
      </div>
    )
  }
  else
  {
    // console.log("This is read")
    return (
      <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={nameUser}
        connect={true}
        video={video}
        audio={audio}
      >
        <VideoConference />
      </LiveKitRoom>
    )
  }

}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: true },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
        <ParticipantTile />
     
    </GridLayout>
  );
}