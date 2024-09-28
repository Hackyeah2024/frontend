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

import { Player } from "@/widgets";
import { useMediaRemote } from "@vidstack/react";
import { VideoLayout } from "@/widgets/player/video-layout";

const video = {
  id: "1",
  title: "Video 1",
  createdAt: new Date(),
  url: "/uploads/28-09-2024/HY_2024_film_08-1727533310844-800692397.mp4",
  duration: 29,
  // posterUrl: "/uploads/28-09-2024/HY_2024_film_08-1727533310844-800692397.mp4",
  // thumbnails: "/uploads/28-09-2024/HY_2024_film_08-1727533310844-800692397.mp4",
  tracks: [],
  speechTranscript: [
    {
      time: 8,
      text: "Hello, my name is John Doe. I'm a software engineer.",
    },
    {
      time: 12,
      text: "I'm from the United States.",
    },
    {
      time: 16,
      text: "I play the guitar.",
    },
    {
      time: 20,
      text: "I love to travel.",
    },
    {
      time: 24,
      text: "Thank you for watching my video.",
    },
  ],
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="shadow-md p-4 rounded-md">
              <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
              <Player
                src={video.url}
                title={video.title}
                tracks={video.tracks}
              />
            </div>
            <div className="p-4 rounded-md">
              <p>Add your tabs content here</p>
            </div>
          </div>
          <div className="shadow-md p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Speech Transcript</h2>
            <div className="flex flex-col gap-2">
              {video.speechTranscript.map((transcript) => (
                <div className="text-sm" key={transcript.time}>
                  <span className="mr-2 underline">
                    {`${Math.floor(transcript.time / 60)
                      .toString()
                      .padStart(2, "0")}:${(transcript.time % 60)
                      .toString()
                      .padStart(2, "0")}`}
                  </span>
                  <p className="inline">{transcript.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
