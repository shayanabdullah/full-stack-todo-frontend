import React, { act } from "react";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardCommandKey } from "react-icons/md";
import {
  RiMenuFill,
  RiCloseLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from "react-icons/ri";
import { FiUser, FiBook, FiCalendar, FiFlag } from "react-icons/fi";
import { PremiumToggle } from "./ui/bouncy-toggle";
import { useEffect, useRef, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AddNewTask from "./AddNewTask";
import { useTodo } from "@/context/TodoContext";
import useDebounce from "@/hooks/useDebounce";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import SearchSkeleton from "./ui/SearchSkeleton";
import TaskDetailModal from './TaskDetails';
import DeleteTaskModal from "./ui/DeleteTaskModal";
const Navbar = () => {
  const searchInputRef = useRef(null);
  const [searchModal, setSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { isLoaded, setIsOpen, backendUrl, setTaskModal, taskModal,  setTaskDetailId, deleteModal } = useTodo();

  const quickActions = [
    {
      label: "Add New Task",
      description: "Create a new task",
      icon: "plus",
      color: "purple",
      onClick: () => {
        setSearchModal(false);
        setIsOpen(true);
      },
    },
    {
      label: "Today's Tasks",
      description: "View tasks for today",
      icon: "calendar",
      color: "blue",
    },
    {
      label: "Completed Tasks",
      description: "View all completed",
      icon: "check",
      color: "green",
    },
    {
      label: "Important Tasks",
      description: "View high priority tasks",
      icon: "flag",
      color: "red",
    },
  ];

 

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchModal(true);
      }
      if (event.key === "Escape") {
        setSearchModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (searchModal && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchModal]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
      case "low":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "personal":
        return <FiUser />;
      case "work":
        return <FiBook />;
      case "study":
        return <FiBook />;
      case "health":
        return <FiFlag />;
      default:
        return <FiUser />;
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const debounceSearch = useDebounce(searchQuery);

  const { getToken } = useAuth();

  const saveSearchHistory = (query) => {
    if (!query.trim()) return;

    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    history = history.filter(
      (item) => item.toLowerCase() !== query.toLowerCase(),
    );

    history.unshift(query);

    history = history.slice(0, 8);

    localStorage.setItem("searchHistory", JSON.stringify(history));
    setSearchHistory(history);
  };
const handleTaskDetail = (task) => {
  setSearchModal(false);
  setTaskDetailId(task._id)
  setTaskModal(true);
}

  const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    saveSearchHistory(searchQuery);
    getSearch()
  }
};

  const getSearch = async () => {
    if (!isLoaded || !debounceSearch.trim()) return;

    try {
      setSearchLoading(true);
      const token = await getToken();

      const { data } = await axios.get(
       `${backendUrl}/tasks?search=${debounceSearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSearchResult(data.tasks);
    } catch (err) {
      console.log(err);
    } finally { 
      setSearchLoading(false)
    }
  };
const clearHistory = () => {
  localStorage.removeItem("searchHistory");
  setSearchHistory([]);
};
  useEffect(() => {
    getSearch();
  }, [debounceSearch]);
  

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    setSearchHistory(history);
  }, []);

  return (
    <div>
      <header className="flex min-h-16 justify-between shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-border py-3">
        <div className="px-4 flex items-center w-1/2 gap-x-5">
          <SidebarTrigger
            className="ml-3"
            icon={<RiMenuFill />}
            iconClass={"text-2xl!"}
          />
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search tasks"
              onClick={() => setSearchModal(true)}
              className="py-2.5 pl-8 w-full border border-accent-foreground/30 rounded-md font-mono text-sm cursor-pointer"
            />
            <i className="absolute top-1/2 left-2 -translate-y-1/2">
              <CiSearch className=" text-lg" />
            </i>
            <i className="absolute top-1/2 right-5 -translate-y-1/2 flex items-center text-muted-foreground text-sm">
              <MdKeyboardCommandKey className=" text-base" />K
            </i>
          </div>
        </div>
        <div className="px-4 flex items-center">
          <div className="">
            <PremiumToggle defaultChecked={false} />
          </div>
        </div>
      </header>
      {
        // Search Modal
        searchModal && (
          <>
            <div
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-30 "
              onClick={() => setSearchModal(false)}
            />

            <div className="bg-card text-card-foreground rounded-2xl shadow-2xl w-full max-w-4xl max-h-[70vh]  mx-auto overflow-hidden fixed left-1/2 top-20 -translate-x-1/2 z-40">
              {/* Search Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <CiSearch className="text-xl text-muted-foreground" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search tasks, categories, or keywords..."
                    className="flex-1 py-2 text-lg outline-none bg-transparent"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 px-2 py-1 bg-muted rounded">
                      <MdKeyboardCommandKey />K
                    </span>
                    <button
                      onClick={() => setSearchModal(false)}
                      className="p-2 hover:bg-muted rounded-lg"
                    >
                      <RiCloseLine className="text-xl text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 overflow-y-auto max-h-[55vh] min-h-[25vh]">
                <div
                  className={` ${!searchQuery && "grid grid-cols-1 lg:grid-cols-2 gap-6"}`}
                >
                  {/* Left Column - Recent Searches & Results */}
                  <div className="size-full relative">
                    {!searchQuery ? (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-card-foreground">
                            Recent Searches
                          </h3>
                          <button className="text-xs text-muted-foreground hover:text-card-foreground" onClick={clearHistory}>
                            Clear
                          </button>
                        </div>
                        <div className="space-y-1">
                          {
                            searchHistory.length === 0 ? (
                               <div className="flex flex-col items-center justify-center py-20 text-center">
                       
                        <h3 className="mt-5 text-sm font-semibold text-foreground/80">
                          No Search history
                        </h3>

                      
                      </div>
                            )
                            : (
                              searchHistory.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSearchQuery(item)}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg cursor-pointer"
                            >
                              <CiSearch className="text-muted-foreground" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))
                            )
                          }
                        </div>
                      </div>
                    ) : searchLoading ? (
                      <div className="">
                        <SearchSkeleton />
                      </div>
                    ) : searchResult.length > 0 ? (
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-sm font-semibold text-card-foreground">
                            Results
                          </h3>
                        </div>
                        <div className="space-y-3 ">
                          {searchResult?.map((task) => (
                            <div
                              key={task._id}
                              onClick={()=> handleTaskDetail(task)}
                              className="p-3 border border-border rounded-lg hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/30 dark:hover:bg-purple-900/20 cursor-pointer transition-all"
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-card-foreground text-sm">
                                    {task.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {task.description}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}
                                    >
                                      {task.priority.charAt(0).toUpperCase() +
                                        task.priority.slice(1)}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded flex items-center gap-1">
                                      {getCategoryIcon(task.category)}{" "}
                                      {task.category}
                                    </span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <FiCalendar />{" "}
                                      {new Date(
                                        task.dueDate,
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 border-2 border-card shadow-sm" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                          <CiSearch className="text-3xl text-muted-foreground" />
                        </div>

                        <h3 className="mt-5 text-xl font-semibold text-foreground">
                          No results found
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground max-w-md">
                          We couldn't find any tasks matching{" "}
                          <span className="font-medium text-foreground">
                            "{searchQuery}"
                          </span>
                          . Try searching with a different keyword or category.
                        </p>

                        <button
                          onClick={() => setSearchQuery("")}
                          className="mt-6 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
                        >
                          Clear Search
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Quick Actions */}
                  {!searchQuery && (
                    <div>
                      <h3 className="text-sm font-semibold text-card-foreground mb-3">
                        Quick Actions
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action, idx) => (
                          <div
                            key={idx}
                            className="p-4 border border-border rounded-xl hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm cursor-pointer transition-all"
                            onClick={action.onClick && action.onClick}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                                action.color === "purple"
                                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                  : action.color === "blue"
                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                    : action.color === "green"
                                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                      : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              }`}
                            >
                              {action.icon === "plus" && (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              )}
                              {action.icon === "calendar" && (
                                <FiCalendar className="w-4 h-4" />
                              )}
                              {action.icon === "check" && (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                              {action.icon === "flag" && (
                                <FiFlag className="w-4 h-4" />
                              )}
                            </div>
                            <h4 className="font-medium text-card-foreground text-sm">
                              {action.label}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {action.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 px-2 py-1 border border-border rounded">
                    esc Close
                  </span>
                </div>
              </div>
            </div>
          </>
        )
      }

     {taskModal && <TaskDetailModal />}
  {deleteModal && <DeleteTaskModal />}
    </div>
  );
};

export default Navbar;
