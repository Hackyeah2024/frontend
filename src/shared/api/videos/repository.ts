import axios, { AxiosError } from "axios";
import { VideoDataMapper } from "./data-mapper";
// import { Video } from "./types";

const video = {
  analysis: {
    main_subject:
      "            Na pocz\u0105tku mowy om\u00f3wiono nowe zasady dotycz\u0105ce przedsi\u0119biorstw transportu drogowego, kt\u00f3re wchodz\u0105 w \u017cycie drugiego sierpnia bie\u017c\u0105cego roku, w zwi\u0105zku z przyj\u0119ciem kolejnego pakietu sankcji wobec Bia\u0142orusi.",
    off_topic_segments: [],
    quality_metrics: {
      age_target_groups: {
        AGE_GROUP_13_18: 0.1,
        AGE_GROUP_19_24: 0.2,
        AGE_GROUP_25_34: 0.3,
        AGE_GROUP_35_44: 0.2,
        AGE_GROUP_45_54: 0.1,
        AGE_GROUP_55_64: 0.05,
        AGE_GROUP_65_PLUS: 0.05,
      },
      categorized_segments: [
        {
          category: "informacyjne",
          from_segment: 0,
          to_segments: 1,
        },
      ],
      clarity_coherence: {
        justification:
          "Wypowied\u017a jest w miar\u0119 zrozumia\u0142a, ale zawiera powt\u00f3rzenia i drobne b\u0142\u0119dy, kt\u00f3re mog\u0105 utrudnia\u0107 pe\u0142ne zrozumienie.",
        score: 6,
      },
      facts_to_verify: [
        {
          fact: "nowe zasady dotycz\u0105ce przedsi\u0119biorstwa sportu drogowego",
          fact_with_more_context:
            "Nowe zasady dotycz\u0105ce przedsi\u0119biorstwa sportu drogowego wchodz\u0105 w \u017cycie drugiego sierpnia bie\u017c\u0105cego roku.",
        },
        {
          fact: "pakiet sankcji wobec Bia\u0142orusi",
          fact_with_more_context:
            "Kolejny pakiet sankcji wobec Bia\u0142orusi zosta\u0142 przyj\u0119ty i wchodzi w \u017cycie drugiego sierpnia bie\u017c\u0105cego roku.",
        },
        {
          fact: "rozszerzenie zakazu wykonywania przewod\u00f3w",
          fact_with_more_context:
            "Zakaz wykonywania przewod\u00f3w przez przedsi\u0119biorstwa z siedzib\u0105 w Bia\u0142orusi zostanie rozszerzony z dniem drugiego sierpnia bie\u017c\u0105cego roku.",
        },
      ],
      filler_words_usage: {
        justification:
          "Nie wykryto nadmiernego u\u017cycia s\u0142\u00f3w wype\u0142niaj\u0105cych.",
        score: 8,
      },
      grammar_syntax: {
        justification:
          "Wyst\u0119puj\u0105 b\u0142\u0119dy gramatyczne i sk\u0142adniowe, takie jak 'wydniem' zamiast 'dniem' oraz 'przed siembers' zamiast 'przedsi\u0119biorstw'.",
        score: 5,
      },
      gunning_fog_index: 12,
      issues_detected: [
        ["FALSE_OR_NON_EXISTING_WORDS", "REPETITION"],
        ["FALSE_OR_NON_EXISTING_WORDS", "REPETITION"],
      ],
      key_topics: [
        "nowe zasady dotycz\u0105ce przedsi\u0119biorstwa sportu drogowego",
        "pakiet sankcji wobec Bia\u0142orusi",
        "rozszerzenie zakazu wykonywania przewod\u00f3w",
      ],
      llm_off_topic_segments: [],
      persuasiveness: {
        justification:
          "Wypowied\u017a jest informacyjna, ale powt\u00f3rzenia i b\u0142\u0119dy mog\u0105 os\u0142abia\u0107 jej przekonuj\u0105cy charakter.",
        score: 6,
      },
      relevance_to_subject: {
        justification:
          "Wypowied\u017a jest w du\u017cej mierze zgodna z tematem, ale powt\u00f3rzenia mog\u0105 wprowadza\u0107 pewne zamieszanie.",
        score: 8,
      },
      sentiment: {
        emotions_detected: ["informative"],
        overall: "NEUTRAL",
      },
      structure_conserved_score: {
        justification:
          "Brakuje wyra\u017anego wst\u0119pu, rozwini\u0119cia i zako\u0144czenia. Wypowied\u017a jest bardziej informacyjna ni\u017c strukturalna.",
        score: 5,
      },
      structure_organization: {
        justification:
          "Struktura wypowiedzi jest s\u0142aba, brakuje wyra\u017anego podzia\u0142u na wst\u0119p, rozwini\u0119cie i zako\u0144czenie.",
        score: 5,
      },
      vocabulary_richness: {
        justification:
          "S\u0142ownictwo jest stosunkowo proste, ale zawiera kilka trudniejszych termin\u00f3w zwi\u0105zanych z tematem sankcji i transportu drogowego.",
        score: 6,
      },
    },
  },
  events: [
    {
      event_analysis: {
        changes_in_sentiment: null,
        changes_in_topics: [
          "przepisy dotycz\u0105ce przedsi\u0119biorstw sportowych",
          "sankcje wobec Bia\u0142orusi",
          "zakazy dotycz\u0105ce przewod\u00f3w",
        ],
        significant_events:
          "W obu segmentach mowa jest o nowych zasadach wprowadzanych od 2 sierpnia, jednak Segment 2 wprowadza dodatkowy kontekst dotycz\u0105cy rozszerzenia zakazu dla przedsi\u0119biorstw z Bia\u0142orusi.",
      },
      from_segment: 0,
      index: 1,
      to_segment: 1,
    },
  ],
  segments_analysis: [
    {
      clarity: 8,
      coherence: 7,
      key_topics: [
        "nowe zasady",
        "przedsi\u0119biorstwo sportu drogowego",
        "pakiet sankcji",
        "Bia\u0142oru\u015b",
      ],
      sentiment: "Neutral",
    },
    {
      clarity: 6,
      coherence: 5,
      key_topics: [
        "zaka",
        "przewody",
        "przedsi\u0119biorstwa",
        "Bia\u0142oru\u015b",
        "nowe zasady",
        "transport drogowy",
      ],
      sentiment: "Neutral",
    },
  ],
  subtitles_matching: {
    changes: [
      "Minor differences in wording and phrasing.",
      "Different formatting of the date (2 sierpnia vs drugiego sierpnia).",
      "Use of 'przewod\u00f3w' in transcription vs 'przewoz\u00f3w' in OCR.",
      "The phrase 'przedsi\u0119biorstwa sportu drogowego' in transcription vs 'przedsi\u0119biorstw transportu drogowego' in OCR.",
      "The transcription has a more complex structure in the first sentence compared to the OCR version.",
    ],
    subtitles_similarity: 85,
  },
  transcription: [
    {
      from: 9.500000000000002,
      text: "Wydniem drugiego sierpnia bie\u017c\u0105cego roku wchodz\u0105 w \u017cycie nowe zasady dotycz\u0105ce przedsi\u0119biorstwa sportu drogowego w zwi\u0105zku z przyj\u0119ciem kolejnego pakietu sankcji wobec Bia\u0142orusi.",
      to: 19.0,
    },
    {
      from: 19.0,
      text: "Do tych czas obowi\u0105zuj\u0105cy zaka z wykonywania przewod\u00f3w przez przedsi\u0119biorstwa z siedzibem w Bia\u0142orusi zostanie rozszerzony z dniem drugiego sierpnia bie\u017c\u0105cego roku wchodz\u0105 w \u017cycie nowe zasady dotycz\u0105ce przed siembers transportu drogowego.",
      to: 30.58,
    },
  ],
};

type Video = typeof video;

class VideoRepository {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_BASE_URL || "https://api.example.com";
  }

  async getAllVideos(userId: string): Promise<Video[]> {
    try {
      const response = await axios.get<Video[]>(
        `${this.baseUrl}/users/${userId}/videos`
      );
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to fetch videos");
    }
  }

  async getVideo(): Promise<Video> {
    try {
      // const response = await axios.get<Video>(
      //   `${this.baseUrl}/users/${userId}/videos/${videoId}`
      // );
      // return VideoDataMapper.toDTO(response.data)
      // return response.data;
      return video;
    } catch (error) {
      this.handleError(error, "Failed to fetch video");
    }
  }

  private handleError(error: unknown, defaultMessage: string): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(
          `API error: ${axiosError.response.status} - ${axiosError.response.data}`
        );
      } else if (axiosError.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error(`Error setting up the request: ${axiosError.message}`);
      }
    }
    throw new Error(defaultMessage);
  }
}

export const videoRepository = new VideoRepository();
