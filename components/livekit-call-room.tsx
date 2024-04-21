"use client";

import { useEffect, useState } from "react";
import { GridLayout, LiveKitRoom, ParticipantTile, VideoConference, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";

import { Loader2 } from "lucide-react";
import { Track } from "livekit-client";

interface MediaRoomProps {
  chatId: string;
  video?: boolean;
  audio?: boolean;
  userIdProp?: string;
};

export const MediaRoom = ({
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
      } catch (e) {
        console.error(e);
      }
    })();
  }, );
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

export const MediaRoomDirect = ({
  chatId,
}: MediaRoomProps) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit-participate-token?room=${chatId}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, );
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
    <div
      className="w-full"
      style={
        {
          minHeight: "50%"
        }
      }
    >
      <LiveKitRoom
      token={token}
      video={false}
      audio={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
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