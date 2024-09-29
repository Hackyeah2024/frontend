"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui";

const chartConfig = {
  age_group: {
    label: "Age Group",
  },
  age_group_13_18: {
    label: "13-18 lat",
    color: "hsl(var(--orange-500))",
  },
  age_group_19_24: {
    label: "19-24 lat",
    color: "hsl(var(--indigo-700))",
  },
  age_group_25_34: {
    label: "25-34 lat",
    color: "hsl(var(--green-600))",
  },
  age_group_35_44: {
    label: "35-44 lat",
    color: "hsl(var(--violet-500))",
  },
  age_group_45_54: {
    label: "45-54 lat",
    color: "hsl(var(--lime-600))",
  },
  age_group_55_64: {
    label: "55-64 lat",
    color: "hsl(var(--zinc-500))",
  },
  age_group_65_plus: {
    label: "65+ lat",
    color: "hsl(var(--pink-500))",
  },
} satisfies ChartConfig;

interface AgeGroupChartProps {
  ageGroups: {
    [key: string]: number;
  };
}

export function AgeGroupChart({ ageGroups }: AgeGroupChartProps) {
  const chartData = Object.entries(ageGroups).map(([key, value]) => ({
    age_group: key.slice(10).replace("_", "-") + " lat",
    percentage: value * 100,
    // @ts-expect-error
    fill: chartConfig[key.toLowerCase()].color,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-3">
        <CardTitle>Wiek odbiorców</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="age_group"
              label={data => `${data.payload.percentage}%`}
              innerRadius={30}
            >
              <LabelList
                dataKey="age_group"
                className="fill-background"
                stroke="none"
                position="right"
                fontSize={10}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
