"use client";

import { videoApi } from "@/shared/api";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { calculateVideoQuality } from "@/shared/lib";

interface CompareVideosProps {
  videoIds: string[];
}

export const CompareVideos = ({ videoIds }: CompareVideosProps) => {
  if (typeof window === "undefined") return null;

  const videos = videoApi.getAllVideos();
  const selectedVideos = videos.filter((video) =>
    videoIds.includes(video.file_id)
  );

  if (selectedVideos.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">
          Proszę wybrać przynajmniej 2 filmy do porównania
        </h1>
        <h2>
          Możesz wybrać filmy, klikając na nie w sekcji{" "}
          <Link className="underline hover:underline" href="/videos">
            Twoje wideo
          </Link>{" "}
          lub klikając w przycisk &quot;Porównaj wideo&quot; na stronie
          pojedynczego wideo.
        </h2>
      </div>
    );
  }

  const mappedVideos = selectedVideos.map((video) => ({
    id: video.file_id,
    title: video.name,
    modifications: video.analysis.quality_metrics.issues_detected.reduce(
      (acc, curr) => acc + curr.length,
      0
    ),
    quality: calculateVideoQuality(video),
    coherence: video.analysis.quality_metrics.clarity_coherence.score,
    selected: false,
  }));

  return <DataTable data={mappedVideos} columns={columns} />;
};
