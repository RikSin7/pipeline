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
    <div className="p-4 border-b">
      <h2 className="text-lg font-semibold">{query || "No active run"}</h2>

      <div className="flex gap-4 mt-2 text-sm">
        <span>Status: {status}</span>
        <span>Time: {displayTime}s</span>
        {status === "failed" && (
          <div className="text-red-600 text-sm mt-2">
            {state.run.error}
          </div>
        )}
      </div>
    </div>
  );
}