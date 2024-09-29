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

export type BoundingBox = {
  bottom: number;
  left: number;
  right: number;
  time_offset: number;
  top: number;
};

export type VideoAnalysis = {
  main_subject: string;
  quality_metrics: {
    age_target_groups: {
      [key: string]: number;
    };
    categorized_segments: Array<{
      category: string;
      from_segment: number;
      to_segments: number;
    }>;
    clarity_coherence: {
      justification: string;
      score: number;
    };
    facts_to_verify: Array<{
      fact: string;
      fact_with_more_context: string;
    }>;
    filler_words_usage: {
      justification: string;
      score: number;
    };
    grammar_syntax: {
      justification: string;
      score: number;
    };
    gunning_fog_index: number;
    issues_detected: Array<string[]>;
    key_topics: string[];
    persuasiveness: {
      justification: string;
      score: number;
    };
    relevance_to_subject: {
      justification: string;
      score: number;
    };
    sentiment: {
      emotions_detected: string[];
      overall: string;
    };
    structure_conserved_score: {
      justification: string;
      score: number;
    };
    structure_organization: {
      justification: string;
      score: number;
    };
    vocabulary_richness: {
      justification: string;
      score: number;
    };
  };
};

export type VideoEvent = {
  event_analysis: {
    changes_in_sentiment: null | string[]; // You might want to define a more specific type here
    changes_in_topics: string[];
    significant_events: null | string[];
  };
  from_segment: number;
  index: number;
  to_segment: number;
};

export type VideoSubtitlesMatching = {
  changes: string[];
  subtitles_similarity: number;
};

export type Video = {
  analysis: VideoAnalysis;
  detected_persons: BoundingBox[];
  events: VideoEvent[];
  questions: string[];
  segments_analysis: VideoCoherenceSegment[];
  subtitles_matching: VideoSubtitlesMatching;
  summary: string;
  transcription: VideoTranscription[];
  file_id: string;
  name: string;
  creation_time: string;
  duration: number;
  video_url: string;
};
