import useDebounce from "@/hooks/useDebounce";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [weeklyData, setWeeklyData] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [statsData, setStatsData] = useState({
    totalTasks: 0,
    completedTasks: 0,
    highPriorityTasks: 0,
    todayTasks: 0,
    growth: 0,
  });

    const [filters, setFilters] = useState({
      status: "All Status",
      priority: "All Priority",
      category: "All Category",
      search: "",
    });
  const [taskModal, setTaskModal] = useState(false);
  const [taskDetailId, setTaskDetailId] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const { status, priority, category, search } = filters;
  const { getToken, isLoaded } = useAuth();

  const fetchTodos = async () => {
    if (!isLoaded) return;
    const token = await getToken();

    const res = await axios.get(`${backendUrl}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setStatsData(res?.data?.stats);
    setWeeklyData(res.data.weeklyData);
  };

  const getAllTask = async () => {
    const token = await getToken();

    const res = await axios.get(`${backendUrl}/all/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(res.data.todos);
  };
  

const fetchFilteredTasks = async ({
  status,
  priority,
  category,
  search,
}) => {
  const token = await getToken();

  
  const params = {};

  if (search) params.search = search;
  if (status !== "All Status") params.status = status.toLowerCase();
  if (priority !== "All Priority") params.priority = priority.toLowerCase();
  if (category !== "All Category") {
  params.category = category.toLowerCase();
}

  const res = await axios.get(`${backendUrl}/tasks`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setTasks(res.data.tasks);
};

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        weeklyData,
        isOpen,
        setIsOpen,
        tasks,
        setTasks,
        editingTask,
        setEditingTask,
        statsData,
        setStatsData,
        fetchTodos,
        getAllTask,
        isLoaded,
        backendUrl,
        taskModal,
        setTaskModal,
        taskDetailId,
        setTaskDetailId,
        deleteModal,
        setDeleteModal,
        fetchFilteredTasks,
          filters,
    setFilters,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
