import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AreaChartComp = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.completed, 0);
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-0">
        <div>
          <h3 className="text-lg font-semibold">Weekly Activity</h3>

          <p className="text-sm text-muted-foreground mt-1">
            Completed tasks this week
          </p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-primary">{total}</p>

          <span className="text-xs text-muted-foreground">Tasks</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={190}>
        <AreaChart
          data={data}
          margin={{
            top: 25,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />

              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="4 4"
            opacity={0.45}
          />

          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 12,
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 11,
            }}
          />

          <Tooltip
            cursor={{
              stroke: "var(--primary)",
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              color: "var(--foreground)",
              boxShadow: "0 10px 30px rgba(0,0,0,.12)",
            }}
          />

          <Area
            type="monotone"
            dataKey="completed"
            stroke="var(--primary)"
            strokeWidth={3}
            fill="url(#gradient)"
            animationDuration={1200}
            activeDot={{
              r: 7,
              fill: "var(--primary)",
              stroke: "var(--background)",
              strokeWidth: 3,
            }}
            dot={{
              r: 4,
              fill: "var(--primary)",
              stroke: "var(--card)",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComp;
