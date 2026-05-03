import Loader from "./Loader";

const STATUS_CONFIG = {
  running: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
    label: "Running",
    icon: <Loader size="sm" className="text-primary" />,
  },
  complete: {
    bg: "bg-success/10",
    border: "border-success/30",
    text: "text-success",
    label: "Complete",
    icon: "✓",
  },
  failed: {
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    text: "text-destructive",
    label: "Failed",
    icon: "✖",
  },
  cancelled: {
    bg: "bg-muted",
    border: "border-border",
    text: "text-muted-foreground",
    label: "Cancelled",
    icon: "⊘",
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.running;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold border ${config.bg} ${config.border} ${config.text} shadow-sm transition-colors`}>
      <span className="flex items-center justify-center w-3 h-3">
        {config.icon}
      </span>
      {config.label}
    </div>
  );
}