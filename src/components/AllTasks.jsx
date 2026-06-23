import React, { useState } from "react";
import TaskCard from "./ui/TaskCard";

const AllTasks = () => {
  // Sample tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project",
      description: "Finish the todo app and submit",
      status: "pending",
      priority: "high",
      category: "Work",
      date: "Jun 23, 2026",
    },
    {
      id: 2,
      title: "Morning jog",
      description: "30 minutes run in the park",
      status: "completed",
      priority: "low",
      category: "Health",
      date: "Jun 23, 2026",
    },
  ]);

  // Toggle task status
  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task,
      ),
    );
  };

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div>
      <div className="main grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {/* Todo List */}
        <div className="w-full p-4 rounded-xl border bg-card shadow-sm">
          {/* header */}
          <div className="pb-4 flex items-center gap-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-lg font-bold">Todo List</span>
            <span className="bg-sky-200 w-6 h-6 text-sm flex items-center justify-center rounded-full text-sky-700 font-semibold">
              {pendingTasks.length}
            </span>
          </div>
          {/* All Tasks */}
          <div className="flex flex-col gap-y-3">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                priority={task.priority}
                category={task.category}
                date={task.date}
                onToggleStatus={() => toggleTaskStatus(task.id)}
              />
            ))}
          </div>
        </div>
        {/* Completed Tasks */}
        <div className="w-full p-4 rounded-xl border bg-card shadow-sm">
          {/* header */}
          <div className="pb-4 flex items-center gap-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
            <span className="text-lg font-bold">Completed</span>
            <span className="bg-green-200 w-6 h-6 text-sm flex items-center justify-center rounded-full text-green-700 font-semibold">
              {completedTasks.length}
            </span>
          </div>
          {/* Completed Tasks List */}
          <div className="flex flex-col gap-y-3">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                priority={task.priority}
                category={task.category}
                date={task.date}
                onToggleStatus={() => toggleTaskStatus(task.id)}
              />
            ))}
     
          </div>
           {
        completedTasks.length === 0  && (
          <div className="text-center w-full h-full flex items-center justify-center text-lg text-gray-500">
            No completed tasks yet.
          </div>
        )
      }
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
