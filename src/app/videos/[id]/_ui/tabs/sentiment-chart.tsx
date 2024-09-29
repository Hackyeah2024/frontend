"use client";

import { VideoCoherenceSegment, VideoTranscription } from "@/shared/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from "@/shared/ui";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis
} from "recharts";

interface SentimentChartProps {
  segments: VideoCoherenceSegment[];
  transcriptions: VideoTranscription[];
}

type Sentiment = "Positive" | "Negative" | "Neutral";

const sentimentNameMapper: Record<Sentiment, string> = {
  Positive: "Pozytywny",
  Negative: "Negatywny",
  Neutral: "Neutralny",
};

const sentimentValueMapper: Record<Sentiment, number> = {
  Positive: 3,
  Negative: 1,
  Neutral: 2,
};

const valueToSentimentMapper = (value: number): Sentiment | undefined => {
  switch (value) {
    case 1:
      return "Negative";
    case 2:
      return "Neutral";
    case 3:
      return "Positive";
    default:
      return undefined;
  }
};

const chartConfig = {
  sentimentValue: {
    label: "Poziom sentymentu",
    color: "hsl(var(--blue-500))",
  },
} satisfies ChartConfig;

const getBarColor = (sentimentValue: number) => {
  switch (sentimentValue) {
    case 1:
      return "hsl(var(--red-500))"; // Red
    case 2:
      return "hsl(var(--blue-500))"; // Blue
    case 3:
      return "hsl(var(--green-500))"; // Green
    default:
      return "hsl(var(--muted))"; // Default color
  }
};

export const SentimentChart = ({
  segments,
  transcriptions,
}: SentimentChartProps) => {
  const chartData = segments.map((segment, index) => ({
    sentiment: segment.sentiment,
    sentimentValue: sentimentValueMapper[segment.sentiment as Sentiment],
    from: Math.floor(transcriptions[index].from),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocena aspektów językowych</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="min-h-52" config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ left: 20, right: 20, top: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="from"
              tickMargin={8}
              tickFormatter={(value) => `${value}s`}
              interval={"preserveStartEnd"}
            />
            <YAxis
              domain={[0, 3]}
              tickMargin={8}
              tickCount={4}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const sentiment = valueToSentimentMapper(value);
                if (!sentiment) {
                  return "";
                }
                return sentimentNameMapper[sentiment];
              }}
            />
            <Bar dataKey="sentimentValue">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.sentimentValue)}
                />
              ))}
            </Bar>
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
