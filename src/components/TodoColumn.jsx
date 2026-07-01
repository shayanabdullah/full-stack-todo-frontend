import { useTodo } from "@/context/TodoContext";
import React from "react";
import TaskCard from "./ui/TaskCard";
import toast from "react-hot-toast";
import { ShowToast } from "@/utils/ShowToast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const TodoColumn = ({ grid, tasks, title, color }) => {
  const {
    setEditingTask,
    setIsOpen,
    setDeleteModal,
    setTaskDetailId,
    setTasks,
    backendUrl,
  } = useTodo();

  const deleteTask = (id) => {
    setTaskDetailId(id);
    setDeleteModal(true);
  };

  const { getToken } = useAuth();

  const toggleTaskStatus = async (toggoleTask) => {
    const token = await getToken();

    const newStatus =
      toggoleTask.status === "pending" ? "completed" : "pending";

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t._id === toggoleTask._id ? { ...t, status: newStatus } : t,
      ),
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
        },
      );
      toast.custom((t) => (
        <ShowToast
          t={t}
          type={newStatus === "completed" ? "success" : "info"}
          title={newStatus === "completed" ? "Task Completed" : "Task Reopened"}
          message={
            newStatus === "completed"
              ? "Great job! The task has been marked as completed."
              : "The task has been moved back to your to-do list."
          }
        />
      ));
    } catch (error) {
      // rollback
      setTasks((prev) =>
        prev.map((t) =>
          t._id === toggoleTask._id ? { ...t, status: toggoleTask.status } : t,
        ),
      );
    }
  };

  return (
    <div className="w-full  rounded-xl border bg-card shadow-sm min-h-[40vh] overflow-y-auto">
      {/* header */}
      <div
        className={`p-4 flex items-center gap-x-2 shrink-0 border-b sticky top-0 bg-card z-10 `}
      >
        <div className={`w-3 h-3 bg-${color}-600 rounded-full animate-pulse`} />
        <span className="text-lg font-bold">{title}</span>
        <span className={`bg-${color}-200 w-6 h-6 text-sm flex items-center justify-center rounded-full text-${color}-700 font-semibold`}>
          {tasks.length}
        </span>
      </div>
      {/* All Tasks */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4  ${grid}`}>
        {tasks.map((task) => (
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
      {tasks.length === 0 && (
        <div className="text-center  text-lg text-gray-500 pt-20">
          No tasks yet.
        </div>
      )}
    </div>
  );
};

export default TodoColumn;
