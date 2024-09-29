"use client";

import { VideoCoherenceSegment, VideoTranscription } from "@/shared/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/shared/ui";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
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
  Negative: 2,
  Neutral: 1,
};

const chartConfig = {
  issues: {
    label: "Poziom sentymentu",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export const SentimentChart = ({
  segments,
  transcriptions,
}: SentimentChartProps) => {
  const chartData = segments.map((segment, index) => ({
    sentiment: sentimentNameMapper[segment.sentiment as Sentiment],
    sentimentValue: sentimentValueMapper[segment.sentiment as Sentiment],
    from: Math.floor(transcriptions[index].from),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocena aspektów językowych</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="from"
              tickMargin={8}
              tickFormatter={(value) => `${value}s`}
            />
            <YAxis hide domain={[1, 3]} tickMargin={8} tickCount={3} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="sentimentValue" fill="hsl(var(--chart-4))" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
