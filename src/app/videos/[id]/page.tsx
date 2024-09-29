import { videoRepository } from "@/shared/api";
import { Player } from "@/widgets";
import { VideoTabs, VideoText } from "./_ui";

const defaultVideo = {
  id: "1",
  title: "Video 1",
  createdAt: new Date(),
  url: "/uploads/28-09-2024 18-51-57-671/HY_2024_film_08-1727533310844-800692397.mp4",
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

export default async function Page({ params }: { params: { id: string } }) {
  const video = await videoRepository.getVideo();

  return (
    <section className="py-10 h-full">
      <div className="max-w-7xl mx-auto px-2 md:px-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="shadow-md p-4 rounded-md">
              <h1 className="text-2xl font-bold mb-4">{defaultVideo.title}</h1>
              <Player
                src={defaultVideo.url}
                title={defaultVideo.title}
                tracks={defaultVideo.tracks}
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
