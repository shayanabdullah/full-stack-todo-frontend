import React, { useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import TaskCard from "./ui/TaskCard";
import { useOutsideClick } from "../hooks/useOutsideClick";
import AllTasks from "./AllTasks";
import TaskHeader from "./TaskHeader";

const TodoDisplay = ({ fetch, tasks, setTasks, setEditingTask, setIsOpen }) => {
  return (
    <div className="space-y-4">
      <div className="w-full p-5 border rounded-xl shadow bg-card relative">
        <TaskHeader />
      </div>

      <div>
        <AllTasks
          fetch={fetch}
          setTasks={setTasks}
          tasks={tasks}
          setEditingTask={setEditingTask}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default TodoDisplay;
