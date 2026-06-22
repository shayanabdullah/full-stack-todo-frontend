import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    name: "High",
    value: 4,
    color: "#ff4d5a",
  },
  {
    name: "Medium",
    value: 8,
    color: "#f5a623",
  },
  {
    name: "Low",
    value: 12,
    color: "#4cd964",
  },
];

const total = data.reduce((acc, item) => acc + item.value, 0);

export default function TaskOverview() {
  return (
    <div className="bg-card border rounded-2xl p-6">
      <h3 className="font-semibold text-lg mb-4">
        Task Overview
      </h3>

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
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
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
                <tspan
                  x="50%"
                  dy="0"
                  className="text-2xl font-bold"
                >
                  {total}
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
            <div
              key={item.name}
              className="flex items-center gap-3"
            >
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

      <div className="flex justify-end mt-4">
        <button className="text-primary text-sm font-medium hover:underline">
          View full report →
        </button>
      </div>
    </div>
  );
}