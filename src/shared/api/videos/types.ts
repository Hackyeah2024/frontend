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

export type VideoCoherenceSegment = {
  clarity: number;
  coherence: number;
  key_topics: string[];
  sentiment: string;
};

export type VideoDTO = {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  transcription: VideoTranscription[];
  clarity_coherence: {
    justification: string;
    score: number;
  };
  coherenceSegments: VideoCoherenceSegment[];
};
