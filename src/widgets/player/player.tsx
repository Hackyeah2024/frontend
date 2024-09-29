"use client";

import "@vidstack/react/player/styles/base.css";
import { useEffect, useRef } from "react";

import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  TrackProps,
  type MediaPlayerInstance,
} from "@vidstack/react";

import { VideoLayout } from "./video-layout";
import { BoundingBox } from "@/shared/api";
import { BoundingBoxOverlay } from "./bounding-box-overlay";

interface PlayerProps {
  src: string;
  title: string;
  posterUrl?: string;
  thumbnails?: string;
  tracks?: TrackProps[];
  boundingBoxes: BoundingBox[];
}

export function Player({
  src,
  title,
  posterUrl,
  thumbnails,
  tracks,
  boundingBoxes,
}: PlayerProps) {
  const player = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    return player.current!.subscribe(({}) => {});
  }, []);

  return (
    <MediaPlayer
      className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
      title={title}
      src={{
        src: src,
        type: "video/mp4",
      }}
      crossOrigin
      playsInline
      ref={player}
    >
      <MediaProvider>
        {posterUrl && (
          <Poster
            className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
            src={posterUrl}
          />
        )}
        {tracks && tracks.map((track) => <Track {...track} key={track.src} />)}
        <BoundingBoxOverlay boundingBoxes={boundingBoxes} />
      </MediaProvider>

      <VideoLayout thumbnails={thumbnails} />
    </MediaPlayer>
  );
}
