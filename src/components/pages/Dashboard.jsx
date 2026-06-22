import {
  Plus,
  ArrowUp,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  CircleCheck,
  Flag,
} from "lucide-react";
import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import PieChartMy from './../PieChart';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const stats = [
    {
      title: "Total Tasks",
      value: 24,
      growth: "12% from last week",
      icon: ClipboardList,
      cardClass: "card-purple",
      iconColor: "var(--stat-purple-icon)",
    },
    {
      title: "Today's Tasks",
      value: 8,
      growth: "8% from yesterday",
      icon: CalendarDays,
      cardClass: "card-blue",
      iconColor: "var(--stat-blue-icon)",
    },
    {
      title: "Completed",
      value: 12,
      growth: "16% from last week",
      icon: CircleCheck,
      cardClass: "card-green",
      iconColor: "var(--stat-green-icon)",
    },
    {
      title: "High Priority",
      value: 4,
      growth: "4% from yesterday",
      icon: Flag,
      cardClass: "card-red",
      iconColor: "var(--stat-red-icon)",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-9">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold font-mono">
                Good morning, Shayan! 👋
              </h1>

              <p className="text-muted-foreground mt-2 text-sm">
                Here's what's happening with your tasks today.
              </p>
            </div>

            <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl hover:opacity-90 transition">
              <Plus size={18} />
              Add Task
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
            {stats.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className={`${card.cardClass} border rounded-2xl p-6 transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <div className="size-14 rounded-full flex items-center justify-center bg-background/60">
                      <Icon size={28} style={{ color: card.iconColor }} />
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold">{card.value}</h2>

                      <p className="text-muted-foreground text-sm mt-1">
                        {card.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-green-600 text-sm mt-5">
                    <ArrowUp size={14} />
                    <span>{card.growth}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-3 space-y-5">
          {/* Calendar Card */}
          <div className="bg-card border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays size={18} />
              <h3 className="font-semibold">Calendar</h3>
            </div>

            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md w-full!"
            />
          </div>

          {/* Progress Card */}
          <div className="bg-card border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="text-green-500" size={18} />
              <h3 className="font-semibold">Today's Progress</h3>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completed</span>
                  <span>75%</span>
                </div>

                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-[75%] h-full bg-primary rounded-full" />
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                6 of 8 tasks completed today.
              </p>
            </div>
          </div>
          <div className="">
            <PieChartMy/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
