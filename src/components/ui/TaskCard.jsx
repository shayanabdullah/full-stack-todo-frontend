import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { PiBookOpenLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { Edit, Trash2 } from "lucide-react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const TaskCard = ({
  id,
  onDelete,
  onEdit,
  title,
  description,
  status,
  priority,
  category,
  date,
  onToggle,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const categoryicon = {
    Personal: <IoPersonOutline />,
    Work: <LuBriefcaseBusiness />,
    Study: <PiBookOpenLight />,
    Health: <CiHeart />,
  };

  const priorityColors = {
    low: "bg-green-100 text-green-700 border-green-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    high: "bg-red-100 text-red-700 border-red-200",
  };

  const categoryColors = {
    Personal: "bg-purple-100 text-purple-700 border-purple-200",
    Work: "bg-blue-100 text-blue-700 border-blue-200",
    Study: "bg-blue-100 text-blue-700 border-blue-200",
    Health: "bg-pink-100 text-pink-700 border-pink-200",
  };

  // Use useOutsideClick to close the menu
  const menuRef = useOutsideClick(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  });

  const toggleTodo = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    await onToggle();

    setLoading(false);
  };

  return (
    <div className="w-full border rounded-xl p-4 bg-card shadow-sm hover:shadow-md transition-all">
      {/* header */}
      <div className="flex items-start justify-between relative">
        <div className="flex gap-3 items-start">
          <div className="mt-1">
            <button
              onClick={toggleTodo}
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                status === "completed"
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {loading ? (
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                status === "completed" && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )
              )}
            </button>
          </div>

          <div className="flex-1">
            <h3
              className={`font-semibold capitalize text-lg ${status === "completed" ? "text-gray-400 line-through" : "text-foreground"}`}
            >
              {title}
            </h3>
            <p
              className={`text-sm mt-1 ${status === "completed" ? "text-gray-400" : "text-muted-foreground"}`}
            >
              {description}
            </p>

            {/* TAGS */}
            <div className="flex items-center gap-2 mt-3">
              {/* Priority Tag */}
              <span
                className={`px-3 py-1 rounded-md text-xs font-semibold capitalize border ${priorityColors[priority]}`}
              >
                {priority}
              </span>

              {/* Category Tag */}
              <span
                className={`px-3 py-1 rounded-md text-xs font-semibold capitalize flex items-center gap-1 border ${categoryColors[category]}`}
              >
                {categoryicon[category]}
                {category}
              </span>
            </div>

            {/* Date */}
            <div className="mt-3">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {date}
              </span>
            </div>
          </div>
        </div>

        {/* menu for edit delete task */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <HiOutlineDotsVertical
              size={20}
              className="text-muted-foreground"
            />
          </button>

          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-background border rounded-lg shadow-xl z-50">
              <div className="p-1">
                <button
                  onClick={() => {
                    onEdit();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={onDelete}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
