
import * as React from "react";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, BarChart as RechartsBarChart } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface BarChartProps {
  data: any[];
  xAxisKey: string;
  categories: string[];
  colors?: string[];
  yAxisWidth?: number;
  showAnimation?: boolean;
}

export const BarChart = ({
  data,
  xAxisKey,
  categories,
  colors = ["#6366F1"],
  yAxisWidth = 40,
  showAnimation = false,
}: BarChartProps) => {
  return (
    <ChartContainer
      config={{
        ...Object.fromEntries(
          categories.map((category, i) => [
            category,
            {
              color: colors[i % colors.length],
            },
          ])
        ),
      }}
    >
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xAxisKey} />
        <YAxis width={yAxisWidth} />
        <Tooltip content={<ChartTooltipContent />} />
        {categories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};
