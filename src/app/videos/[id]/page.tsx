import { videoRepository } from "@/shared/api";
import { Player } from "@/widgets";
import { VideoTabs, VideoText } from "./_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const video = await videoRepository.getVideo();

  const videoUrl = `http://localhost:5000/${video.video_url}`;

  return (
    <section className="py-10 h-full">
      <div className="max-w-7xl mx-auto px-2 md:px-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="shadow-md p-4 rounded-md">
              <h1 className="text-2xl font-bold mb-4">
                {video.video_url.split("/").pop()}
              </h1>
              <Player
                src={videoUrl}
                title={video.video_url.split("/").pop() || ""}
                boundingBoxes={video.detected_persons}
              />
            </div>
            <div className="p-4 rounded-md shadow-md">
              <VideoTabs video={video} />
            </div>
          </div>
          <VideoText
            summary={video.summary}
            transcription={video.transcription}
          />
        </div>
      </div>
    </section>
  );
}
