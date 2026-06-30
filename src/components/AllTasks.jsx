  import React, { useEffect, useState } from "react";
  import TaskCard from "./ui/TaskCard";
  import axios from "axios";
  import { useAuth } from "@clerk/clerk-react";
  import toast from "react-hot-toast";
  import { ShowToast } from "@/utils/ShowToast";
import { useTodo } from "@/context/TodoContext";

  const AllTasks = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
const {tasks, setTasks, fetchTodos, setEditingTask, setIsOpen,} = useTodo()
    const { getToken } = useAuth();

    const deleteTask = async (id) => {
      try {
        const token = await getToken();

        await axios.delete(`${backendUrl}/delete/task/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks((prev) => prev.filter((task) => task._id !== id));

        await fetchTodos();
        toast.custom((t) => (
          <ShowToast
            t={t}
            type="error"
            title="Task Deleted"
            message="The task has been removed."
          />
        ));
      } catch (error) {
        console.log(error);
      }
    };

    const pendingTasks = tasks.filter((task) => task.status === "pending");
    const completedTasks = tasks.filter((task) => task.status === "completed");


    const toggleTaskStatus = async (toggoleTask) => {
  const token = await getToken();

  const newStatus =
    toggoleTask.status === "pending"
      ? "completed"
      : "pending";

  // Optimistic update
  setTasks((prev) =>
    prev.map((t) =>
      t._id === toggoleTask._id
        ? { ...t, status: newStatus }
        : t
    )
  );

  try {
   const res = await axios.post(
      `${backendUrl}/task/edit/${toggoleTask._id}`,
      {
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  toast.custom((t) => (
  <ShowToast
    t={t}
    type={newStatus === "completed" ? "success" : "info"}
    title={
      newStatus === "completed"
        ? "Task Completed"
        : "Task Reopened"
    }
    message={
      newStatus === "completed"
        ? "Great job! The task has been marked as completed."
        : "The task has been moved back to your to-do list."
    }
  />))
  } catch (error) {
    // rollback
    setTasks((prev) =>
      prev.map((t) =>
        t._id === toggoleTask._id
          ? { ...t, status: toggoleTask.status }
          : t
      )
    );
  }
};
    return (
      <div className=" scrollbar-[1px] scrollbar-thumb-accent scrollbar-track-transparent">
        {tasks.length <= 0 ? (
          <div className="text-center py-10 capitalize w-full flex flex-col justify-center items-center h-[50vh]">
            <h3 className="text-lg font-semibold">No tasks yet!</h3>
            <p className="text-muted-foreground">
              Create a new task to get started.
            </p>
          </div>
        ) : (
          <div className="main grid grid-cols-1 md:grid-cols-2 gap-x-8 h-[calc(100vh-150px)]">
            {/* Todo List */}
            <div className="w-full  rounded-xl border bg-card shadow-sm min-h-[40vh] overflow-y-auto">
              {/* header */}
              <div className="p-4 flex items-center gap-x-2 shrink-0 border-b sticky top-0 bg-card z-10">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-lg font-bold">Todo List</span>
                <span className="bg-sky-200 w-6 h-6 text-sm flex items-center justify-center rounded-full text-sky-700 font-semibold">
                  {pendingTasks.length}
                </span>
              </div>
              {/* All Tasks */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4  ">
                {pendingTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    id={task._id}
                    onDelete={() => deleteTask(task._id)}
                    onEdit={() => {
                      setEditingTask(task);
                      setIsOpen(true);
                    }}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    category={task.category}
                    date={new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    onToggle={() => toggleTaskStatus(task)}
                  />
                ))}
              </div>
                {pendingTasks.length === 0 && (
                <div className="text-center w-full h-full flex items-start justify-center text-lg text-gray-500 pt-20">
                  No completed tasks yet.
                </div>
              )}
            </div>

            {/* Completed Tasks */}
             <div className="w-full  rounded-xl border bg-card shadow-sm min-h-[40vh] overflow-y-auto">
              {/* header */}
              <div className="p-4 flex items-center gap-x-2 shrink-0 border-b sticky top-0 bg-card z-10">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
                <span className="text-lg font-bold">Completed List</span>
                <span className="bg-green-200 w-6 h-6 text-sm flex items-center justify-center rounded-full text-green-700 font-semibold">
                  {completedTasks.length}
                </span>
              </div>
              {/* All Tasks */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4  ">
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    id={task._id}
                    onDelete={() => deleteTask(task._id)}
                    onEdit={() => {
                      setEditingTask(task);
                      setIsOpen(true);
                    }}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    category={task.category}
                    date={new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    onToggle={() => toggleTaskStatus(task)}
                  />
                ))}
              </div>
                {completedTasks.length === 0 && (
                <div className="text-center w-full h-full flex items-start justify-center text-lg text-gray-500 pt-20">
                  No completed tasks yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default AllTasks;
