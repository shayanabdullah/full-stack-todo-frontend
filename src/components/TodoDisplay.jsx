import React, { useEffect, useMemo, useState } from "react";
import AllTasks from "./AllTasks";

import { Search } from "lucide-react";
import FilterDropdown from "./FilterDropDown";
import useDebounce from "@/hooks/useDebounce";
import { useTodo } from "@/context/TodoContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const TodoDisplay = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { filters, setFilters, fetchFilteredTasks } = useTodo();

  const { status, priority, category, search } = filters;
  const statusOptions = ["All Status", "pending", "completed"];
  const priorityOptions = ["All Priority", "low", "medium", "high"];
  const categoryOptions = [
    "All Category",
    "Personal",
    "Work",
    "Study",
    "Health",
  ];

  const selectOption = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setOpenDropdown(null);
  };

  const debouncedSearch = useDebounce(search)


useEffect(() => {
  fetchFilteredTasks({
    status,
    priority,
    category,
    search: debouncedSearch,
  });
}, [status, priority, category, debouncedSearch]);

  return (
    <div className="space-y-4">
      {/* Todo Header : search, filter, sort */}
      <div className="w-full p-5 border rounded-xl shadow bg-card relative">
        {/* Search, filter , Sort */}
        <div className="w-full flex items-center gap-4">
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-background">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent outline-none text-sm"
              value={search}
              onChange={(e) => selectOption("search", e.target.value)}
            />
          </div>

          {/* Status Dropdown */}
          <FilterDropdown
            value={status}
            options={statusOptions}
            isOpen={openDropdown === "status"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "status" ? null : "status")
            }
            onSelect={(value) => selectOption("status", value)}
          />

          {/* Priority Dropdown */}
          <FilterDropdown
            value={priority}
            options={priorityOptions}
            isOpen={openDropdown === "priority"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "priority" ? null : "priority")
            }
            onSelect={(value) => selectOption("priority", value)}
          />
          {/* Category Dropdown */}
          <FilterDropdown
            value={category}
            options={categoryOptions}
            isOpen={openDropdown === "category"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "category" ? null : "category")
            }
            onSelect={(value) => selectOption("category", value)}
          />
        </div>
      </div>

      <div>
        <AllTasks  />
      </div>
    </div>
  );
};

export default TodoDisplay;
