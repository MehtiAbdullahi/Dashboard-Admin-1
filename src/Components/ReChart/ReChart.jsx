import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import style from "./ReChart.module.css";

const data = [
  { month: "", revenue: 0 },
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 45000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 52000 },
  { month: "May", revenue: 47000 },
  { month: "Jun", revenue: 68000 },
  { month: "Jul", revenue: 38000 },
  { month: "Aug", revenue: 52000 },
  { month: "Sep", revenue: 24000 },
  { month: "Oct", revenue: 51000 },
  { month: "Nov", revenue: 20000 },
  { month: "Dec", revenue: 83000 },
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const value = payload[0].payload.sales;

  return <div className={style["sales-tooltip"]}>{value.toLocaleString()}</div>;
}

export default function SalesChart() {
  return (
    <div className={style["sales-chart"]}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#467DFF" stopOpacity={0.2} />

              <stop offset="100%" stopColor="#467DFF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="#EAECEF" />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            tick={{
              fill: "#A1A5AA",
              fontSize: 12,
            }}
            tickMargin={12}
          />

          <YAxis
            domain={[0, 100000]}
            ticks={[0, 20000, 40000, 60000, 80000, 100000]}
            tickFormatter={(value) => `${value / 1000}K`}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#A1A5AA",
              fontSize: 12,
            }}
            width={45}
          />

          <Tooltip
            formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#467DFF"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "#467DFF",
            }}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
