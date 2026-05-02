import Loader from "./Loader";

const STATUS_CONFIG = {
  running: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    label: "Running...",
    icon: <Loader size="sm" className="text-blue-600" />,
  },
  complete: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    label: "Complete",
    icon: "✓",
  },
  failed: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    label: "Failed",
    icon: "✖",
  },
  cancelled: {
    bg: "bg-gray-100",
    border: "border-gray-200",
    text: "text-gray-600",
    label: "Skipped",
    icon: "⊘",
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.running;

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.border} ${config.text}`}>
      {config.icon}
      {config.label}
    </div>
  );
}