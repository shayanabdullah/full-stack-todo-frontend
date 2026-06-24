
import { RiCloseLine } from "react-icons/ri";

const AddNewTask = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-20 " onClick={() => setIsOpen(false)} />
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
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
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
                  htmlFor="task"
                  className="font-medium text-foreground text-sm"
                >
                  Task Title{" "}
                  <span className="text-destructive font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="task"
                  id="task"
                  placeholder="Enter task title..."
                  className="py-3 px-3 rounded-sm text-sm border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                />
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
                  className="py-3 px-3 rounded-sm text-sm border border-input bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer"
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
                id="description"
                rows="5"
                maxLength={80}
                placeholder="Add task description..."
                className="py-3 px-3 rounded-sm text-sm border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Second Row: Priority & Status */}
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex flex-col gap-y-2 relative">
                
                  <span className="absolute top-[60%] left-3 w-3 h-3 rounded-full bg-(--stat-red-icon) z-10"/>
                <label
                  htmlFor="priority"
                  className="font-medium text-foreground text-sm"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  className="py-3 px-7 rounded-sm text-sm border border-input bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex flex-col gap-y-2 relative">
                <label
                  htmlFor="status"
                  className="font-medium text-foreground text-sm"
                >
                  Status
                </label>
                  <span className="absolute top-[60%] left-3 w-3 h-3 rounded-full bg-(--stat-blue-icon) z-10"/>
                <select
                  id="status"
                  className="py-3 px-7 rounded-sm text-sm border border-input bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer"
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
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dueDate"
                  className="w-full py-2.5 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                />
             
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-5 border-t border-border flex items-center justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Create Task
            </button>
          </div>
        </div>
    </div>
  );
};

export default AddNewTask;
