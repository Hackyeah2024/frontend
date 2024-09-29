"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { VideoCoherenceSegment, VideoTranscription } from "@/shared/api";

interface CoherenceChartProps {
  clarity_coherence: {
    justification: string;
    score: number;
  };
  coherenceSegments: VideoCoherenceSegment[];
  transcription: VideoTranscription[];
}

const chartConfig = {
  coherence: {
    label: "Spójność",
    color: "hsl(var(--chart-1))",
  },
  clarity: {
    label: "Zrozumiałość",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const CoherenceChart = ({
  clarity_coherence,
  coherenceSegments,
  transcription,
}: CoherenceChartProps) => {
  const chartData = coherenceSegments.map((segment, index) => ({
    coherence: segment.coherence,
    clarity: segment.clarity,
    from: Math.floor(transcription[index].from),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spójność i zrozumiałość wypowiedzi</CardTitle>
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
            />
            <YAxis
              domain={[0, 10]}
              tickMargin={8}
              tickCount={11}
              interval={"preserveStartEnd"}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="coherence"
              type="linear"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
            />
            <Line
              dataKey="clarity"
              type="linear"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground">
          {clarity_coherence.justification}
        </div>
      </CardFooter>
    </Card>
  );
};
