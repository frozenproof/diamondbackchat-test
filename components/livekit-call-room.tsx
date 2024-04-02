"use client";

import { useEffect, useState } from "react";
import { ControlBar, GridLayout, LiveKitRoom, ParticipantTile, PreJoin, VideoConference, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";
import { Channel } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Track } from "livekit-client";
import { redirect } from "next/navigation";

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
  const { user } = useUser();
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   if (!user?.firstName || !user?.lastName) return;

  //   const name = userIdProp;

  //   (async () => {
  //     try {
  //       const resp = await fetch(`/api/livekit-create-token?room=${chatId}&username=${name}`);
  //       const data = await resp.json();
  //       console.log(data);
  //       setToken(data.token);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })()
  // }, [user?.firstName, user?.lastName, chatId]);
  useEffect(() => {
    (async () => {
      try {
        const name = userIdProp;
        const room2 = "quickstart-room";
        const name2 = "quickstart-user";
        const resp = await fetch(
          `/api/livekit-create-token?room=${room2}&username=${name2}`
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
        Loading {process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        </p>
      </div>
    )
  }

  return (
    <div
      className="h-full"
    >
      <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      token={token}
      connect={true}
      video={false}
      audio={audio}
      options={{
        publishDefaults: {
          videoCodec: 'vp9',
        },
      }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      {/* <MyVideoConference /> */}
      <VideoConference />
    </LiveKitRoom>
    </div>

  )
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}