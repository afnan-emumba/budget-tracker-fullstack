import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LinePlotProps {
  data: { day?: number; month?: string; value: number }[];
  range: string;
}

const LinePLot = ({ data, range }: LinePlotProps) => {
  return (
    <ResponsiveContainer width='100%' height={500}>
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={range === "1" ? "day" : "month"}
          tickLine={false}
          padding={{ left: 40, right: 40 }}
        />
        <YAxis
          label={{ value: "Expenses", angle: -90, position: "insideLeft" }}
          domain={[0, "dataMax"]}
          interval={0}
          tickCount={10}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        <Legend align='right' verticalAlign='top' />
        <Line
          type='monotone'
          dataKey='value'
          stroke='#7539ff'
          strokeWidth={2}
          dot={{ fill: "#7539ff" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LinePLot;
