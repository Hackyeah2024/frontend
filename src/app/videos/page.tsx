"use client";

import { videoApi } from "@/shared/api";
import { columns, DataTable } from "./_ui";

export default function Page() {
  if (typeof window === "undefined") return null;

  const data = videoApi.getAllVideos();
  const mappedData = data.map((video) => ({
    id: video.file_id,
    selected: false,
    title: video.name,
    createdAt: video.creation_time,
    duration: video.duration,
  }));

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <DataTable columns={columns} data={mappedData} />
      </div>
    </section>
  );
}
