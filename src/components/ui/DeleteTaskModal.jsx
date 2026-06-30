import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useTodo } from "@/context/TodoContext";

const DeleteTaskModal = ({}) => {
  const { tasks, taskDetailId, deleteModal, setDeleteModal,  } = useTodo();

  const task= tasks.find((t) => t._id === taskDetailId);
  const taskTitle = task?.title || "Task"

  const onClose = () => {
    setDeleteModal(false)
  }

  const onConfirm = () => {
  onClose()
  }
  const handleDelete = () => {}

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-60 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-card shadow-2xl overflow-hidden" 
    onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>

              <div>
                <button className="text-lg font-bold" onClick={handleDelete}>Delete Task</button>

                <p className="text-sm text-muted-foreground">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            <div className="rounded-xl border border-red-500/20 bg-red-50 dark:bg-red-950/20 p-4">
              <p className="text-sm text-muted-foreground">
                You're about to permanently delete
              </p>

              <p className="mt-2 font-semibold text-lg break-words">
                "{taskTitle}"
              </p>

              <p className="mt-4 text-sm text-muted-foreground">
                The task and all of its information will be permanently removed.
                You won't be able to recover it later.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t p-5">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border hover:bg-muted transition"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
            >
              <Trash2 size={16} />
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteTaskModal;
