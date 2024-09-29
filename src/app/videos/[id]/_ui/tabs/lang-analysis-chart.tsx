"use client";

import { VideoTranscription } from "@/shared/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
} from "@/shared/ui";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";

const issuesMapper = {
  INTERLUDE: "Interlude",
  SPEAKING_TOO_FAST: "Mówienie zbyt szybko",
  REPETITION: "Powtórzenie",
  CHANGE_THE_TOPIC_OF_SPEECH: "Zmiana tematu mówienia",
  TOO_MANY_NUMBERS: "Zbyt wiele liczb",
  TOO_LONG_DIFFICULT_WORDS_OR_SENTENCES: "Zbyt długie słowa lub zdania",
  JARGON: "Jargon",
  FORREIGN_LANGUAGE: "Język obcy",
  PAUSING_TOO_LONG: "Pauza zbyt długa",
  SPEAKING_LAUDER: "Mówienie za głośno",
  SPEAKING_TOO_QUIET_IN_WHISPER: "Mówienie za cicho w koce",
  SECOND_PLAN_ANOTHER_PERSON_ON_THE_SET: "Druga osoba na tle",
  TURNING_AWAY_TWISTING_OR_GESTICULATING:
    "Obracanie się, skręcanie lub gestikulacja",
  FACIAL_EXPRESSIONS: "Wyrazy twarzy",
  FALSE_OR_NON_EXISTING_WORDS: "Fałszywe lub nieistniejące słowa",
  INCONSISTENT_SPEECH: "INCONSISTENT_SPEECH",
  NOISE: "NOISE",
  USE_OF_THE_PASSIVE_SIDE: "Użycie strony biernej",
  ACCENTUATION: "Akcent",
  USED_FORREIGN_LANGUAGE_PHRASES_OTHER_THAN_POLISH:
    "Użycie języków obcych poza polskim",
};

interface LangAnalysisChartProps {
  issuesDetected: string[][];
  transcription: VideoTranscription[];
}

const chartConfig = {
  issues: {
    label: "Błędy językowe",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const LangAnalysisChart = ({
  issuesDetected,
  transcription,
}: LangAnalysisChartProps) => {
  const chartData = issuesDetected.map((issues, index) => ({
    issues: issues.length,
    issuesList: issues.map(
      (issue) => issuesMapper[issue as keyof typeof issuesMapper]
    ),
    from: Math.floor(transcription[index].from),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocena aspektów językowych</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="from"
              tickMargin={8}
              tickFormatter={(value) => `${value}s`}
              interval={"preserveStartEnd"}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              dataKey="issues"
              type="monotone"
              stroke="none"
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md">
        <p className="text-sm text-muted-foreground">
          {payload[0].payload.issues}{" "}
          {payload[0].payload.issues !== 1
            ? "Błędów wykryto:"
            : "Błąd wykryto:"}
        </p>
        <ul>
          {payload[0].payload.issuesList.map((issue: string) => (
            <li key={issue}>{issue}</li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};
