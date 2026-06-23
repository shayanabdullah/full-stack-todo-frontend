import React, { useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const TaskHeader = () => {
   const [status, setStatus] = useState("All Status");
  const [priority, setPriority] = useState("All Priority");
  const [category, setCategory] = useState("All Category");

  const [openDropdown, setOpenDropdown] = useState(null);

  const statusOptions = ["All Status", "pending", "completed"];
  const priorityOptions = ["All Priority", "low", "medium", "high"];
  const categoryOptions = [
    "All Category",
    "Personal",
    "Work",
    "Study",
    "Health",
  ];




  // Close dropdown when clicking outside
  const closeDropdowns = () => setOpenDropdown(null);

  // Use useOutsideClick for each dropdown container - we'll create refs and manage them
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const selectOption = (dropdown, option) => {
    switch (dropdown) {
      case "status":
        setStatus(option);
        break;
      case "priority":
        setPriority(option);
        break;
      case "category":
        setCategory(option);
        break;
      case "sort":
        setSortBy(option);
        break;
    }
    setOpenDropdown(null);
  };

  // Create refs for each dropdown container
  const statusDropdownRef = useOutsideClick(() => {
    if (openDropdown === "status") closeDropdowns();
  });

  const priorityDropdownRef = useOutsideClick(() => {
    if (openDropdown === "priority") closeDropdowns();
  });

  const categoryDropdownRef = useOutsideClick(() => {
    if (openDropdown === "category") closeDropdowns();
  });


  return (
    <div>
           {/* Search, filter , Sort */}
      <div className="w-full flex items-center gap-4">
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-background">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent outline-none text-sm"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative" ref={statusDropdownRef}>
            <div
              className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-background cursor-pointer min-w-30 justify-between"
              onClick={() => toggleDropdown("status")}
            >
              <span className="text-sm capitalize">{status}</span>
              <ChevronDown size={16} className="text-muted-foreground" />
            </div>
            {openDropdown === "status" && (
              <div className="absolute top-full left-0 mt-1 w-full bg-background border rounded-lg shadow-lg z-50">
                {statusOptions.map((option) => (
                  <div
                    key={option}
                    className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-muted"
                    onClick={() => selectOption("status", option)}
                  >
                    <span className="text-sm capitalize">{option}</span>
                    {status === option && (
                      <Check size={16} className="text-primary" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority Dropdown */}
          <div className="relative" ref={priorityDropdownRef}>
            <div
              className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-background cursor-pointer min-w-30 justify-between"
              onClick={() => toggleDropdown("priority")}
            >
              <span className="text-sm capitalize">{priority}</span>
              <ChevronDown size={16} className="text-muted-foreground" />
            </div>
            {openDropdown === "priority" && (
              <div className="absolute top-full left-0 mt-1 w-full bg-background border rounded-lg shadow-lg z-50">
                {priorityOptions.map((option) => (
                  <div
                    key={option}
                    className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-muted"
                    onClick={() => selectOption("priority", option)}
                  >
                    <span className="text-sm capitalize">{option}</span>
                    {priority === option && (
                      <Check size={16} className="text-primary" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative" ref={categoryDropdownRef}>
            <div
              className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-background cursor-pointer min-w-30 justify-between"
              onClick={() => toggleDropdown("category")}
            >
              <span className="text-sm capitalize">{category}</span>
              <ChevronDown size={16} className="text-muted-foreground" />
            </div>
            {openDropdown === "category" && (
              <div className="absolute top-full left-0 mt-1 w-full bg-background border rounded-lg shadow-lg z-50">
                {categoryOptions.map((option) => (
                  <div
                    key={option}
                    className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-muted"
                    onClick={() => selectOption("category", option)}
                  >
                    <span className="text-sm">{option}</span>
                    {category === option && (
                      <Check size={16} className="text-primary" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

       
        </div>
    </div>
  )
}

export default TaskHeader