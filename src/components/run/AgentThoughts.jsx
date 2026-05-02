import { useRun } from "../../state/RunContext";

export default function AgentThoughts() {
  const { state } = useRun();

  if (!state.thoughts.length) return null;

  return (
    <div className="p-5 border border-border rounded-xl mb-6 bg-card/60 shadow-sm backdrop-blur-sm">
      <h4 className="text-sm font-semibold mb-4 text-card-foreground flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
        Agent Thoughts
      </h4>

      <div className="space-y-3 text-sm text-muted-foreground">
        {state.thoughts.map((t, idx) => (
          <div key={idx} className="leading-relaxed border-l-2 border-primary/20 pl-4 py-1 relative">
            <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
              {t.taskId || "system"}
            </span>
            <span className="text-foreground/90">{t.thought}</span>
          </div>
        ))}
      </div>
    </div>
  );
}