"use client";

import { videoApi } from "@/shared/api";
import { Player, UploadVideo } from "@/widgets";
import { VideoTabs, VideoText } from "./_ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import { Upload } from "lucide-react";

const mapGunningFogIndexToDescription = (index: number) => {
  if (index < 7) {
    return "język bardzo prosty, zrozumiały już dla uczniów szkoły podstawowej";
  } else if (index < 9) {
    return "język prosty, zrozumiały już dla uczniów gimnazjum";
  } else if (index < 12) {
    return "język dość trudny, zrozumiały dla studentów studiów licencjackich";
  } else if (index < 16) {
    return "język bardzo trudny, zrozumiały dla studentów studiów magisterskich";
  } else {
    return "język bardzo trudny, zrozumiały dla magistrów i osób z wyższym wykształceniem";
  }
};

export default function Page({ params }: { params: { id: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  if (typeof window === "undefined") return null;

  const video = videoApi.getVideo(params.id);

  if (!video) notFound();

  const videoUrl = `https://hbe.k8s.techyon.dev${video.video_url}`;

  return (
    <section className="py-10 h-full">
      <div className="max-w-7xl mx-auto px-2 md:px-4 h-full">
        <div className="flex justify-end">
          <Button
            className="inline-flex items-center gap-2"
            onClick={handleUploadClick}
          >
            <Upload className="w-4 h-4" />
            Porównaj wideo
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="shadow-md p-4 rounded-md">
              <h1 className="text-2xl font-bold mb-4">{video.name}</h1>
              <Player
                src={videoUrl}
                title={video.name}
                boundingBoxes={video.detected_persons}
              />
            </div>
            <div className="p-4 rounded-md shadow-md text-sm">
              <Accordion type="single" collapsible>
                <ul className="[&_ul]:list-[revert] mb-2">
                  <li>
                    Miara prostego języka{" "}
                    <span className="font-semibold">
                      (Współczynnik Mglistości Gunninga):
                    </span>{" "}
                    <span className="font-bold">
                      {video.analysis.quality_metrics.gunning_fog_index}
                    </span>
                    . Oznacza to, że{" "}
                    {mapGunningFogIndexToDescription(
                      video.analysis.quality_metrics.gunning_fog_index
                    )}
                    .
                  </li>
                  <li>
                    <AccordionItem className="border-none" value="subtitles">
                      <AccordionTrigger>
                        <span className="inline-flex items-center gap-1">
                          Miara jakosci napisow na wideo:
                          <span className="font-bold">
                            {video.subtitles_matching.subtitles_similarity}%
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-inside space-y-2 pl-4">
                          {video.subtitles_matching.changes.map((change) => (
                            <li key={change}>{change}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </li>
                </ul>
              </Accordion>
              <VideoTabs video={video} />
            </div>
          </div>
          <VideoText
            summary={video.summary}
            transcription={video.transcription}
          />
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prześlij wideo</DialogTitle>
          </DialogHeader>
          <UploadVideo
            onUploadSuccess={(videoId) => {
              setIsModalOpen(false);
              router.push(`/compare/?videoIds=${videoId},${video.file_id}`);
            }}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
