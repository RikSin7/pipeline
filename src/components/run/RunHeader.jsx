import { useEffect, useState } from "react";
import { useRun } from "../../state/RunContext";

export default function RunHeader() {
  const { state } = useRun();
  const { query, status, startTime, duration } = state.run;

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (status !== "running" || !startTime) return;

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 500);

    return () => clearInterval(interval);
  }, [status, startTime]);

  const displayTime =
    status === "running"
      ? (elapsed / 1000).toFixed(1)
      : (duration / 1000).toFixed(1);

  return (
    <div className="p-6 border-b border-border/50 bg-card/80 rounded-t-xl mb-6 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-3">
        <span className="text-2xl opacity-80 text-primary">🔍</span>
        {query || "No active run"}
      </h2>

      <div className="flex gap-6 mt-4 text-sm font-medium">
        <span className="text-muted-foreground flex items-center gap-2 bg-muted/40 px-3 py-1 rounded-full border border-border/40">
          <span className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-primary shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse' : status === 'failed' ? 'bg-destructive' : 'bg-success'}`}></span>
          Status: <span className="text-foreground capitalize">{status}</span>
        </span>
        <span className="text-muted-foreground flex items-center gap-2 bg-muted/40 px-3 py-1 rounded-full border border-border/40">
          <span className="text-primary">⏱</span>
          Time: <span className="text-foreground font-mono">{displayTime}s</span>
        </span>
        {status === "failed" && (
          <div className="text-destructive text-sm flex items-center gap-2 bg-destructive/10 px-3 py-1 rounded-full border border-destructive/20">
            <span className="w-2 h-2 rounded-full bg-destructive"></span>
            {state.run.error}
          </div>
        )}
      </div>
    </div>
  );
}