"use client";

import { cn } from "@/shared/lib";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { useState } from "react";
import {
  AgeGroupChart,
  KeyQuestions,
  CoherenceChart,
  LangAnalysisChart,
  SentimentChart,
} from "./tabs";
import { Video } from "@/shared/api";

type Tab =
  | "coherence"
  | "lang_analysis"
  | "sentiment"
  | "key_questions"
  | "target_group"
  | "face_analysis"
  | "gestures";

interface TabGroup {
  label: string;
  tabs: { value: Tab; label: string }[];
}

const tabGroups: TabGroup[] = [
  {
    label: "Analiza wypowiedzi",
    tabs: [
      { value: "coherence", label: "Spójność wypowiedzi" },
      {
        value: "lang_analysis",
        label: "Identyfikacja oceny aspektów językowych",
      },
      { value: "sentiment", label: "Ocena sentymentu" },
      { value: "key_questions", label: "10 pytań do wypowiedzi" },
      { value: "target_group", label: "Grupa docelowa" },
    ],
  },
  {
    label: "Analiza zachowania",
    tabs: [
      { value: "face_analysis", label: "Ocena emocji na twarzy" },
      { value: "gestures", label: "Ocena gestykulacji" },
    ],
  },
];

export const VideoTabs = ({ video }: { video: Video }) => {
  const [selectedTab, setSelectedTab] = useState<Tab>("coherence");

  const renderTabGroup = ({ label, tabs }: TabGroup) => (
    <DropdownMenu key={label}>
      <DropdownMenuTrigger
        className={cn(
          "px-3 py-1 rounded-md",
          tabs.some((tab) => tab.value === selectedTab) && "bg-slate-100"
        )}
      >
        {tabs.find((tab) => tab.value === selectedTab)?.label || label}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-48">
        {tabs.map((tab) => (
          <DropdownMenuItem
            key={tab.value}
            className={cn(
              selectedTab === tab.value && "bg-slate-100 text-slate-900"
            )}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex items-center border border-slate-300 rounded-md p-1">
        {tabGroups.map(renderTabGroup)}
      </div>
      {selectedTab === "target_group" && (
        <AgeGroupChart
          ageGroups={video.analysis.quality_metrics.age_target_groups}
        />
      )}
      {selectedTab === "key_questions" && (
        <KeyQuestions questions={video.questions} />
      )}
      {selectedTab === "coherence" && (
        <CoherenceChart
          clarity_coherence={video.analysis.quality_metrics.clarity_coherence}
          coherenceSegments={video.segments_analysis}
          transcription={video.transcription}
        />
      )}
      {selectedTab === "lang_analysis" && (
        <LangAnalysisChart
          issuesDetected={video.analysis.quality_metrics.issues_detected}
          transcription={video.transcription}
        />
      )}
      {selectedTab === "sentiment" && (
        <SentimentChart
          segments={video.segments_analysis}
          transcriptions={video.transcription}
        />
      )}
    </div>
  );
};
