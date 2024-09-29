"use client";

import { videoApi } from "@/shared/api";

interface CompareVideosProps {
  videoIds: string[];
}

export const CompareVideos = ({ videoIds }: CompareVideosProps) => {
  const videos = videoApi.getAllVideos();
  const selectedVideos = videos.filter((video) =>
    videoIds.includes(video.file_id)
  );

  return (
    <div>
      <h1>Compare Videos</h1>
    </div>
  );
};
