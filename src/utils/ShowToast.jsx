import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";

export const ShowToast = ({
  t,
  title,
  message,
  type = "success",
}) => {
  const toastConfig = {
    success: {
      icon: CheckCircle2,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    error: {
      icon: XCircle,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    info: {
      icon: Info,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
  };

  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`${
        t.visible
          ? "animate-custom-enter"
          : "animate-custom-leave"
      } max-w-md w-full bg-card border border-border shadow-xl rounded-2xl pointer-events-auto flex overflow-hidden`}
    >
      <div className="flex items-center gap-4 p-4 flex-1">
        <div
          className={`size-12 rounded-full ${config.bg} flex items-center justify-center`}
        >
          <Icon className={config.color} size={24} />
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>
      </div>

      <button
        onClick={() => toast.dismiss(t.id)}
        className="px-4 border-l border-border hover:bg-muted"
      >
        ✕
      </button>
    </div>
  );
};