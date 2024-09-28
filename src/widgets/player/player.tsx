"use client";

import "@vidstack/react/player/styles/base.css";
import { useEffect, useRef } from "react";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  TrackProps,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from "@vidstack/react";

import { VideoLayout } from "./video-layout";

interface PlayerProps {
  src: string;
  title: string;
  posterUrl?: string;
  thumbnails?: string;
  tracks?: TrackProps[];
}

export function Player({
  src,
  title,
  posterUrl,
  thumbnails,
  tracks,
}: PlayerProps) {
  const player = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    return player.current!.subscribe(({ paused, viewType }) => {
      console.log("is paused?", "->", paused);
      console.log("is audio view?", "->", viewType === "audio");
    });
  }, []);

  return (
    <MediaPlayer
      className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
      title={title}
      src={src}
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
      </MediaProvider>

      <VideoLayout thumbnails={thumbnails} />
    </MediaPlayer>
  );
}
