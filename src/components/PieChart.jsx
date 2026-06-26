import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function TaskOverview({ statsData }) {
 
const high = statsData?.filter((task) => task.priority === "high").length || 0;
const medium = statsData?.filter((task) => task.priority === "medium").length || 0;
const low = statsData?.filter((task) => task.priority === "low").length || 0;

    const data = [
    {
      name: "High",
      value: high,
      color: "#ff4d5a",
    },
    {
      name: "Medium",
      value: medium,
      color: "#f5a623",
    },
    {
      name: "Low",
      value: low,
      color: "#4cd964",
    },
  ];
  const totalTasks = high + low + medium
  return (
    <div className="bg-card border rounded-2xl p-6">
      <h3 className="font-semibold text-lg mb-4">Task Distribution</h3>

      <div className="flex items-center justify-between">
        {/* Chart */}
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              {/* Center Text */}
              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground"
              >
                <tspan x="50%" dy="0" className="text-2xl font-bold">
                  {totalTasks}
                </tspan>

                <tspan
                  x="50%"
                  dy="22"
                  className="text-sm fill-muted-foreground"
                >
                  Tasks
                </tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="size-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span className="text-sm">
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
