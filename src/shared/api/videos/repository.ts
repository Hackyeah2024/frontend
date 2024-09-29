import axios, { AxiosError } from "axios";
import { VideoDataMapper } from "./data-mapper";
// import { Video } from "./types";

const video = {
  analysis: {
    main_subject:
      "The speech introduces a savings bond offer targeted at individuals, highlighting the flexibility to invest savings over periods ranging from 3 months to 10 years, with options to enhance savings through the 800 plus program. It emphasizes the ability to choose from various bonds to suit individual savings plans.",
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
          category: "oferta obligacji oszcz\u0119dno\u015bciowych",
          from_segment: 0,
          to_segments: 3,
        },
      ],
      clarity_coherence: {
        justification:
          "Wypowied\u017a jest og\u00f3lnie zrozumia\u0142a, ale zawiera pewne b\u0142\u0119dy j\u0119zykowe i niejasno\u015bci, kt\u00f3re mog\u0105 utrudnia\u0107 pe\u0142ne zrozumienie.",
        score: 6,
      },
      facts_to_verify: [
        {
          fact: "Obligacje oszcz\u0119dno\u015bciowe daj\u0105 mo\u017cliwo\u015bci lokowania oszcz\u0119dno\u015bci na okres od 3 miesi\u0119cy do 10 lat.",
          fact_with_more_context:
            "Obligacje oszcz\u0119dno\u015bciowe oferowane przez instytucje finansowe daj\u0105 mo\u017cliwo\u015bci lokowania oszcz\u0119dno\u015bci na okres od 3 miesi\u0119cy do 10 lat.",
        },
        {
          fact: "Program 800 plus daje mo\u017cliwo\u015b\u0107 pomna\u017cania oszcz\u0119dno\u015bci.",
          fact_with_more_context:
            "Program 800 plus, w ramach standardowej oferty, daje mo\u017cliwo\u015b\u0107 pomna\u017cania oszcz\u0119dno\u015bci, nawet w okresie od 1,5 tysi\u0119cy.",
        },
      ],
      filler_words_usage: {
        justification:
          "Nie wykryto nadmiernego u\u017cycia s\u0142\u00f3w wype\u0142niaj\u0105cych.",
        score: 8,
      },
      grammar_syntax: {
        justification:
          "Wyst\u0119puj\u0105 b\u0142\u0119dy gramatyczne i sk\u0142adniowe, takie jak 'o szcz\u0119dno\u015bciowe' zamiast 'oszcz\u0119dno\u015bciowe' oraz 'Relyalizuj\u0105c' zamiast 'Realizuj\u0105c'.",
        score: 5,
      },
      gunning_fog_index: 12,
      issues_detected: [
        [],
        ["FALSE_OR_NON_EXISTING_WORDS"],
        ["FALSE_OR_NON_EXISTING_WORDS", "TOO_MANY_NUMBERS"],
        ["FALSE_OR_NON_EXISTING_WORDS"],
      ],
      key_topics: [
        "oferta obligacji oszcz\u0119dno\u015bciowych",
        "mo\u017cliwo\u015bci lokowania oszcz\u0119dno\u015bci",
        "program 800 plus",
        "indywidualne plany oszcz\u0119dzania",
      ],
      llm_off_topic_segments: [],
      persuasiveness: {
        justification:
          "Wypowied\u017a jest umiarkowanie przekonuj\u0105ca, ale b\u0142\u0119dy j\u0119zykowe mog\u0105 os\u0142abia\u0107 jej wiarygodno\u015b\u0107.",
        score: 6,
      },
      relevance_to_subject: {
        justification:
          "Wypowied\u017a jest w du\u017cej mierze zgodna z tematem, jakim jest oferta obligacji oszcz\u0119dno\u015bciowych, ale zawiera pewne niejasno\u015bci.",
        score: 8,
      },
      sentiment: {
        emotions_detected: ["neutral"],
        overall: "NEUTRAL",
      },
      structure_conserved_score: {
        justification:
          "Struktura wypowiedzi jest cz\u0119\u015bciowo zachowana, ale brakuje wyra\u017anego wst\u0119pu i zako\u0144czenia.",
        score: 5,
      },
      structure_organization: {
        justification:
          "Organizacja wypowiedzi jest \u015brednia, brakuje wyra\u017anego podzia\u0142u na wst\u0119p, rozwini\u0119cie i zako\u0144czenie.",
        score: 5,
      },
      vocabulary_richness: {
        justification:
          "S\u0142ownictwo jest do\u015b\u0107 bogate, ale zawiera b\u0142\u0119dy ortograficzne i niepoprawne formy wyraz\u00f3w.",
        score: 6,
      },
    },
  },
  events: [
    {
      event_analysis: {
        changes_in_sentiment: null,
        changes_in_topics: [
          "oferta",
          "obligacje",
          "osoby",
          "lokowanie",
          "oszcz\u0119dno\u015bci",
        ],
        significant_events: null,
      },
      from_segment: 0,
      index: 1,
      to_segment: 1,
    },
    {
      event_analysis: {
        changes_in_sentiment: null,
        changes_in_topics: [
          "obligacje oszcz\u0119dno\u015bciowe",
          "program 800 plus",
          "lokowanie oszcz\u0119dno\u015bci",
          "pomna\u017canie oszcz\u0119dno\u015bci",
        ],
        significant_events: null,
      },
      from_segment: 1,
      index: 2,
      to_segment: 2,
    },
    {
      event_analysis: {
        changes_in_sentiment: null,
        changes_in_topics: [
          "program 800 plus",
          "oszcz\u0119dno\u015bci",
          "indywidualne plany oszcz\u0119dzania",
          "obligacje",
        ],
        significant_events: null,
      },
      from_segment: 2,
      index: 3,
      to_segment: 3,
    },
  ],
  questions: [
    "Jakie s\u0105 okresy lokowania oszcz\u0119dno\u015bci w obligacjach oszcz\u0119dno\u015bciowych?",
    "Jakie kwoty mo\u017cna pomna\u017ca\u0107 w ramach standardowej oferty programu 800 plus?",
    "Czy obligacje oszcz\u0119dno\u015bciowe s\u0105 dost\u0119pne na okres kr\u00f3tszy ni\u017c 3 miesi\u0105ce?",
    "Jakie s\u0105 korzy\u015bci z realizacji indywidualnych plan\u00f3w oszcz\u0119dzania?",
    "Czy mo\u017cna elastycznie wybiera\u0107 spo\u015br\u00f3d r\u00f3\u017cnych obligacji?",
    "Jakie s\u0105 minimalne i maksymalne okresy oszcz\u0119dzania w ofercie?",
    "Czy oferta skierowana jest tylko do os\u00f3b fizycznych?",
    "Jakie s\u0105 wymagania, aby skorzysta\u0107 z programu 800 plus?",
    "Czy istniej\u0105 dodatkowe op\u0142aty zwi\u0105zane z inwestowaniem w obligacje oszcz\u0119dno\u015bciowe?",
    "Jakie s\u0105 potencjalne zyski z inwestycji w obligacje oszcz\u0119dno\u015bciowe?",
  ],
  segments_analysis: [
    {
      clarity: 8,
      coherence: 7,
      key_topics: ["oferta", "osoby"],
      sentiment: "Neutral",
    },
    {
      clarity: 8,
      coherence: 7,
      key_topics: ["obligacje", "oszcz\u0119dno\u015bci", "lokowanie", "okres"],
      sentiment: "Neutral",
    },
    {
      clarity: 7,
      coherence: 6,
      key_topics: [
        "program 800 plus",
        "oszcz\u0119dno\u015bci",
        "pomna\u017canie",
      ],
      sentiment: "Neutral",
    },
    {
      clarity: 8,
      coherence: 7,
      key_topics: ["indywidualne plany", "oszcz\u0119dzanie", "obligacje"],
      sentiment: "Neutral",
    },
  ],
  subtitles_matching: {
    changes: [
      "Minor spelling errors: 'osob' vs 'os\u00f3b', 'oszcz\u0119dno\u015bciowe' vs 'o szcz\u0119dno\u015bciowe', 'mo\u017cliwo\u015bci' vs 'mo\u017cliwo\u015b\u0107', 'oszcz\u0119dno\u015bci' vs 'o szcz\u0119dno\u015bci', 'Relalizuj\u0105c' vs 'Relyalizuj\u0105c', 'sposr\u00f3d' vs 'spo\u015br\u00f3d'",
      "Repetition of 'oszcz\u0119dno\u015bci nawet w okresie do 12 lat' in OCR subtitles",
      "Different phrasing: 'w przypadku standardowej oferty programu 800 plus' vs 'W przypadku standardowej oferty programu 800 plus'",
    ],
    subtitles_similarity: 85,
  },
  summary:
    "Nasza oferta obejmuje obligacje oszcz\u0119dno\u015bciowe, kt\u00f3re umo\u017cliwiaj\u0105 lokowanie oszcz\u0119dno\u015bci na okres od 3 miesi\u0119cy do 10 lat, z mo\u017cliwo\u015bci\u0105 pomna\u017cania oszcz\u0119dno\u015bci w ramach programu 800 plus. Klienci mog\u0105 elastycznie wybiera\u0107 spo\u015br\u00f3d r\u00f3\u017cnych obligacji, realizuj\u0105c indywidualne plany oszcz\u0119dzania.",
  transcription: [
    {
      from: 10.040000000000001,
      text: "Nasza oferta skierowana jest do os\u00f3b.",
      to: 12.78,
    },
    {
      from: 14.62,
      text: "Obligacje o szcz\u0119dno\u015bciowe daj\u0105 mo\u017cliwo\u015bci lokowania o szcz\u0119dno\u015bci na okres od 3 miesi\u0119cy do 10 lat.",
      to: 22.18,
    },
    {
      from: 22.32,
      text: "W przypadku standardowej oferty programu 800 plus maj\u0105 mo\u017cliwo\u015b\u0107 pomna\u017cania o szcz\u0119dno\u015bci, nawet w okresie od 1,5 tysi\u0119cy.",
      to: 29.98,
    },
    {
      from: 32.34,
      text: "Relyalizuj\u0105c indywidualne plany o szcz\u0119dzania mo\u017cna zatem elastycznie wybiera\u0107 spo\u015br\u00f3d oferowanych przez nas obligacji.",
      to: 39.66,
    },
  ],
};
export type Video = typeof video;

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
