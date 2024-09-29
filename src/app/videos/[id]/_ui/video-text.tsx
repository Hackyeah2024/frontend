import { VideoTranscription } from "@/shared/api";

interface VideoTextProps {
  summary: string;
  transcription: VideoTranscription[];
}

export const VideoText = ({ summary, transcription }: VideoTextProps) => {
  return (
    <div className="shadow-md p-4 rounded-md overflow-auto max-h-[calc(100vh-145px)] h-full">
      <div className="p-3 rounded-md bg-slate-100 mb-3">
        <h2 className="font-semibold mb-2">Text summary</h2>
        <p className="text-sm text-slate-500">{summary}</p>
      </div>
      <div>
        <h2 className="px-2 font-semibold mb-2">Speech Transcript</h2>
        <div className="flex flex-col gap-2 p-2 border rounded-sm border-slate-300">
          {transcription.map((transcript) => (
            <div className="text-sm" key={transcript.from}>
              <span className="mr-2 underline">
                {`${Math.floor(transcript.from / 60)
                  .toString()
                  .padStart(2, "0")}:${(Math.floor(transcript.from) % 60)
                  .toString()
                  .padStart(2, "0")}`}
              </span>
              <p className="inline">{transcript.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
