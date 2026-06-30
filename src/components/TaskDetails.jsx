import { useTodo } from "@/context/TodoContext";
import { ShowToast } from "@/utils/ShowToast";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import {
  X,
  Flag,
  BookOpen,
  Clock,
  CalendarDays,
  Folder,
  User,
  CheckCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { FaFileAlt } from "react-icons/fa";
import DeleteTaskModal from "./ui/DeleteTaskModal";

const TASK = {
  title: "React Assignment",
  createdAt: "Jun 20, 2025",
  updatedAt: "Jun 22, 2025",
  priority: "High",
  category: "Study",
  status: "Pending",
  dueDate: "Jun 30, 2025",
  createdBy: "John Doe",
  description:
    "Finish the global search functionality.\nAdd keyboard navigation.\nSave recent search history.",
};

// ── Style Maps ────────────────────────────────────────────────
const priorityStyles = {
  High: "border border-destructive/50 text-destructive",
  Medium: "border border-chart-3/50 text-chart-3",
  Low: "border border-chart-2/50 text-chart-2",
};

const statusStyles = {
  Pending: "border border-chart-3/50 text-chart-3",
  Completed: "border border-chart-2/50 text-chart-2",
  "In Progress": "border border-chart-5/50 text-chart-5",
};

const categoryStyles = {
  Study: "border border-chart-5/50 text-chart-5",
  Work: "border border-primary/50 text-primary",
  Personal: "border border-chart-1/50 text-chart-1",
};

const priorityValueColors = {
  High: "text-destructive",
  Medium: "text-chart-3",
  Low: "text-chart-2",
};

const statusValueColors = {
  Pending: "text-chart-3",
  Completed: "text-chart-2",
  "In Progress": "text-chart-5",
};

const categoryValueColors = {
  Study: "text-chart-5",
  Work: "text-primary",
  Personal: "text-chart-1",
};

// ── Badge ─────────────────────────────────────────────────────
function Badge({ label, styleMap, Icon }) {
  return (
    <span
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-card ${styleMap[label] ?? "border border-border text-muted-foreground"}`}
    >
      {Icon && <Icon size={12} />}
      {label}
    </span>
  );
}

// ── Info Card ─────────────────────────────────────────────────
function InfoCard({
  icon: Icon,
  label,
  value,
  valueClass = "text-foreground",
}) {
  return (
    <div className="flex items-center gap-3 bg-muted border border-border rounded-xl p-4">
      <Icon size={18} className="text-muted-foreground shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className={`text-sm font-semibold ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
}

// ── Modal Component ───────────────────────────────────────────
export default function TaskDetailModal() {
  const {
    setTaskModal,
    taskModal,
    tasks,
    setTasks,
    backendUrl,
    setEditingTask,
    setIsOpen,
    taskDetailId,
    deleteModal,
    setDeleteModal
  } = useTodo();
    const closeTaskModal = () => {
  setDeleteModal(false);
  setTaskModal(false);
};

  const task = tasks.find((t) => t._id === taskDetailId);

  const { getToken } = useAuth();

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });
  };

  const dueDateFormat = (date) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
    });
  };

  const handleEdit = () => {
    setEditingTask(task);
    closeTaskModal()
    setIsOpen(true);
  };

  const handleDeleteModal = ()=> {
    setDeleteModal(true);
    setTaskModal(false)
  }

  const toggleTaskStatus = async () => {
    const token = await getToken();

    const newStatus = task.status === "pending" ? "completed" : "pending";

    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t)),
    );

    try {
      const res = await axios.post(
        `${backendUrl}/task/edit/${task._id}`,
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
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, status: task.status } : t,
        ),
      );
    }
  };


  const { user } = useUser();

  const name = user?.username || "User";

  if (!taskModal) return;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 capitalize">
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm px-4"
          onClick={closeTaskModal}
        />
        <div
          className={`absolute w-full max-w-3xl rounded-2xl shadow-2xl p-8 left-1/2 -translate-x-1/2 z-40 ${
            task.status === "completed"
              ? "bg-green-50 dark:bg-green-950/20 backdrop-blur-xl border-2 border-green-500/30"
              : "bg-card border border-border"
          }`}
        >
          {/* Close Button */}
          <button
           onClick={closeTaskModal}
            className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0${
                task.status === "completed"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                  : "bg-accent border border-primary/40"
              }`}
            >
              {task.status === "completed" ? (
                <CheckCircle className="w-7 h-7" />
              ) : (
                <FaFileAlt className="text-muted-foreground" />
              )}
            </div>
            <div>
              <h2
                className={`text-2xl font-bold ${
                  task.status === "completed"
                    ? "line-through text-green-600"
                    : "text-foreground"
                }`}
              >
                {task.title}
              </h2>
           
              <p className="text-xs text-muted-foreground mt-0.5">
                Created on {formatDate(task.createdAt)}&nbsp;·&nbsp;Updated on{" "}
                {formatDate(task.updatedAt)}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              label={task.priority}
              styleMap={priorityStyles}
              Icon={Flag}
            />
            <Badge
              label={task.category}
              styleMap={categoryStyles}
              Icon={BookOpen}
            />
            <Badge label={task.status} styleMap={statusStyles} Icon={Clock} />
          </div>

          {/* Description */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Description
            </p>
          <div className="bg-muted border border-border rounded-xl p-4 mb-6">
            {task.description.split("\n").map((line, i) => (
              <p key={i} className="text-sm text-foreground/80 leading-relaxed">
                {line}
              </p>
            ))}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            <InfoCard
              icon={CalendarDays}
              label="Due Date"
              value={dueDateFormat(task.dueDate)}
            />
            <InfoCard
              icon={Folder}
              label="Category"
              value={task.category}
              valueClass={categoryValueColors[task.category]}
            />
            <InfoCard
              icon={Flag}
              label="Priority"
              value={task.priority}
              valueClass={priorityValueColors[task.priority]}
            />
            <InfoCard
              icon={CheckCircle}
              label="Status"
              value={task.status}
              valueClass={statusValueColors[task.status]}
            />
            <InfoCard icon={User} label="Created By" value={name} />
            <InfoCard
              icon={Clock}
              label="Last Updated"
              value={formatDate(task.updatedAt)}
            />
            {task.completedAt && (
              <InfoCard
                icon={CheckCircle}
                label="Completed On"
                value={formatDate(task.completedAt)}
                valueClass="text-green-600"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-destructive/40 text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors" onClick={handleDeleteModal}>
              <Trash2 size={15} />
              Delete
            </button>
            <button
              onClick={toggleTaskStatus}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                task.status === "completed"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
              }`}
            >
              <CheckCircle size={16} />

              {task.status === "completed" ? "Reopen Task" : "Mark Complete"}
            </button>

            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:opacity-90 text-primary-foreground text-sm font-semibold transition-colors"
              onClick={handleEdit}
            >
              <Pencil size={14} />
              Edit Task
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
