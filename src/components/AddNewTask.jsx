import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiCloseLine, RiLoader4Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { ShowToast } from "@/utils/ShowToast";
import { useTodo } from "@/context/TodoContext";

const AddNewTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: "",
    status: "pending",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { setIsOpen, fetchTodos, setTasks, editingTask, isLoaded, setEditingTask } = useTodo();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const { getToken } = useAuth();

  const handleAdd = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!isLoaded) return;
    const token = await getToken();

    if (editingTask) {
      const res = await axios.post(
        `${backendUrl}/task/edit/${editingTask._id}`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        setIsLoading(false);

        setTasks((prev) =>
          prev.map((task) =>
            task._id === editingTask._id ? res.data.todo : task,
          ),
        );
        setIsOpen(false)
        setEditingTask(false)
        toast.custom((t) => (
          <ShowToast
            t={t}
            type="success"
            title="Task Updated"
            message="Your changes have been saved successfully."
          />
        ));
      }

          if(!res.data.success){
       setErrors(res.data)
      setIsLoading(false)
    }
    
    } else {
      const res = await axios.post(`${backendUrl}/create/todo`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.data.success) {
        setErrors(res.data);
        setIsLoading(false);
      }

      if (res.data.success) {
        setTasks((prev) => [res.data.todo, ...prev]);
        await fetchTodos();
        setIsOpen(false);
        toast.custom((t) => (
          <ShowToast
            t={t}
            type="success"
            title="Task Created"
            message="Your new task has been added successfully."
          />
        ));
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTaskData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      category: "",
      status: "pending",
    });
    setErrors({});
    setIsLoading(false);
  };

  useEffect(() => {
    if (editingTask) {
      setTaskData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate?.split("T")[0],
        category: editingTask.category,
        status: editingTask.status,
      });
    }
  }, [editingTask]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-20 "
          onClick={handleClose}
        />
        <div className="bg-card text-card-foreground rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-30">
          {/* Task Header */}
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Add New Task</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Create a new task and stay productive
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RiCloseLine className="text-xl text-muted-foreground" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 overflow-y-auto max-h-[70vh] space-y-5">
            {/* First Row: Task Title & Category */}
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="title"
                  className="font-medium text-foreground text-sm"
                >
                  Task Title{" "}
                  <span className="text-destructive font-bold">*</span>
                </label>
                <input
                  type="text"
                  value={taskData.title}
                  onChange={handleChange}
                  name="title"
                  id="title"
                  placeholder="Enter task title..."
                  disabled={isLoading}
                  className={`py-2.5 px-3 rounded-lg text-sm border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.message
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-input focus:ring-ring"
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="category"
                  className="font-medium text-foreground text-sm"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={taskData.category}
                  onChange={handleChange}
                  name="category"
                  disabled={isLoading}
                  className="py-2.5 px-3 rounded-lg text-sm border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select category</option>
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="study">Study</option>
                  <option value="health">Health</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="description"
                className="font-medium text-foreground text-sm"
              >
                Description
                <span className="text-destructive font-bold">*</span>
              </label>
              <textarea
                value={taskData.description}
                onChange={handleChange}
                name="description"
                id="description"
                rows="3"
                maxLength={80}
                placeholder="Add task description..."
                disabled={isLoading}
                className={`py-2.5 px-3 rounded-lg text-sm border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.message
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-input focus:ring-ring"
                }`}
              />
              {errors.message && (
                <p className="text-xs text-destructive mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Second Row: Priority & Status */}
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="priority"
                  className="font-medium text-foreground text-sm"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  value={taskData.priority}
                  onChange={handleChange}
                  name="priority"
                  disabled={isLoading}
                  className="py-2.5 px-3 rounded-lg text-sm border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="status"
                  className="font-medium text-foreground text-sm"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={taskData.status}
                  onChange={handleChange}
                  name="status"
                  disabled={isLoading}
                  className="py-2.5 px-3 rounded-lg text-sm border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="pending">To Do</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="dueDate"
                className="font-medium text-foreground text-sm"
              >
                Due Date <span className="text-destructive font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dueDate"
                  value={taskData.dueDate}
                  onChange={handleChange}
                  name="dueDate"
                  disabled={isLoading}
                  className={`w-full py-2.5 px-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.message
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-input focus:ring-ring"
                  }`}
                />
              </div>
              {errors.message && (
                <p className="text-xs text-destructive mt-1">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-border flex items-center justify-end gap-3">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={isLoading}
              className="px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RiLoader4Line className="animate-spin" />
                  {editingTask ? "Updating Task ..." : "Creating Task..."}
                </>
              ) : editingTask ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewTask;
