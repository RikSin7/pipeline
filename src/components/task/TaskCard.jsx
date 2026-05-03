import OutputBlock from "./OutputBlock";
import ToolCall from "./ToolCall";
import StatusBadge from "../common/StatusBadge";
import { useRun } from "../../state/RunContext";

export default function TaskCard({ task }) {

  // Grab global state
  const { state } = useRun();

  // Calculate if blocked
  const isBlocked = task.dependsOn?.length > 0 && task.dependsOn.some((parentId) => {
    const parentTask = state.tasks[parentId];
    // If parent doesn't exist yet, or isn't finished/cancelled, task is blocked
    return !parentTask || (parentTask.status !== "complete" && parentTask.status !== "cancelled");
  });

  const borderColor =
    task.status === "complete" ? "border-success/30 shadow-[0_4px_20px_rgba(52,211,153,0.05)]" :
      task.status === "failed" ? "border-destructive/30 shadow-[0_4px_20px_rgba(248,113,113,0.05)]" :
        task.status === "cancelled" ? "border-muted-foreground/20" :
          "border-primary/40 shadow-[0_0_15px_rgba(129,140,248,0.15)]";

  return (
    <div className={`border rounded-xl p-5 transition-all duration-300 bg-card/60 hover:bg-card/80 backdrop-blur-sm ${borderColor}`}>

      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold text-card-foreground text-base tracking-tight">{task.label}</h4>
          <div className="flex flex-col sm:flex-row gap-2 items-start mt-2.5">
            <span className="text-xs font-mono bg-muted/80 text-muted-foreground px-2.5 py-1 rounded-md border border-border/50 shadow-sm flex items-center gap-1.5">
              <span className="opacity-80">🤖</span> {task.agent}
            </span>
            {task.retries > 0 && (
              <span className="text-xs text-nowrap text-warning-foreground font-medium bg-warning/20 px-2 py-1 rounded-md border border-warning/30 flex items-center gap-1">
                <span>🔄</span> Retried {task.retries}x
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Dynamic Status Badge */}
          <StatusBadge status={task.status} />

          {task.dependsOn?.length > 0 && (
            <div className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${isBlocked ? 'bg-warning/10 text-warning-foreground border-warning/30 animate-pulse' : 'bg-muted/50 text-muted-foreground border-border/30'}`}>
              {isBlocked ? '⏳ Waiting on: ' : '✓ Depended on: '}
              {task.dependsOn.join(", ")}
            </div>
          )}
        </div>
      </div>

      {/* --- ERROR & CANCEL STATES --- */}
      {task.status === "failed" && task.error && (
        <div className="mb-4 text-sm text-destructive-foreground bg-destructive/20 p-3 rounded-lg border border-destructive/30 shadow-sm flex gap-2 items-start">
          <span className="text-destructive text-lg">⚠️</span>
          <div>
            <strong className="font-semibold block mb-0.5 text-destructive">Error</strong>
            <span className="text-muted-foreground">{task.error}</span>
          </div>
        </div>
      )}

      {task.status === "cancelled" && task.reason && (
        <div className="mb-4 text-sm text-muted-foreground bg-muted/70 p-3 rounded-lg border border-border/80 border-l-4 border-l-muted-foreground shadow-sm">
          <strong className="font-semibold text-foreground">Intentional Halt:</strong> {task.message || task.reason}
        </div>
      )}

      {/* TOOL CALLS */}
      {task.toolCalls?.length > 0 && (
        <div className="mt-5">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-border"></span> Actions
          </p>
          <div className="space-y-1.5">
            {task.toolCalls.map((call, idx) => <ToolCall key={idx} call={call} />)}
          </div>
        </div>
      )}

      {/* PARTIAL OUTPUTS */}
      {task.outputs?.length > 0 && (
        <div className="mt-5 pt-4 border-t border-border/40">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-border"></span> Findings
          </p>
          <div className="space-y-2.5">
            {task.outputs.map((output, idx) => <OutputBlock key={idx} output={output} />)}
          </div>
        </div>
      )}

      {task.history?.length > 0 && (
        <div className="mt-5 text-[10px] font-mono text-muted-foreground/50 flex items-center gap-2">
          <span className="uppercase tracking-wider font-semibold opacity-70">History:</span>
          <div className="flex items-center gap-1.5">
            {task.history.map((h, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className={h.status === 'failed' ? 'text-destructive/80' : h.status === 'complete' ? 'text-success/80' : ''}>{h.status}</span>
                {i < task.history.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}