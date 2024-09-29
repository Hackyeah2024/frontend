export type RequestVideo = {
  id: string;
  name: string;
  url: string;
  createdAt: string;
};

export type VideoTranscription = {
  to: number;
  text: string;
  from: number;
};

export type VideoDTO = {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  transcription: VideoTranscription[];
};
