import { useRun } from "../../state/RunContext";

export default function FinalOutput() {
  const { state } = useRun();
  const output = state.finalOutput;

  if (!output) return null;

  return (
    <div className="p-6 border border-success/30 bg-success/5 rounded-xl mb-6 shadow-sm backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-success"></div>
      <h3 className="font-semibold text-lg mb-3 text-success flex items-center gap-2">
        <span className="text-xl">✨</span> Final Output
      </h3>

      <p className="text-sm leading-relaxed text-foreground/90">{output.summary || "No summary available"}</p>

      {output.citations && (
        <div className="mt-4 pt-4 border-t border-success/10 text-xs text-muted-foreground space-y-1.5">
          {output.citations.map((c) => (
            <div key={c.ref_id} className="flex items-center gap-2 hover:text-foreground transition-colors cursor-default">
              <span className="text-success/60">📄</span> 
              <span>{c.title} <span className="opacity-50">(p. {c.page})</span></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}