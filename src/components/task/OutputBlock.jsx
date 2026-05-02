export default function OutputBlock({ output }) {
  return (
    <div className={`text-sm p-3 rounded-lg border transition-colors ${output.isFinal ? "bg-success/10 text-success-foreground border-success/30 shadow-sm shadow-success/5" : "bg-muted/40 text-muted-foreground border-border/40 hover:bg-muted/60"}`}>
      <span className="opacity-40 mr-2 font-mono text-primary select-none">↳</span>
      <span className={output.isFinal ? "text-foreground font-medium" : "text-card-foreground"}>{output.content}</span>
      {output.quality ? <span className="ml-3 text-[10px] font-bold uppercase tracking-wider text-success/90 bg-success/10 px-2 py-0.5 rounded-sm border border-success/20 align-middle">Quality: {output.quality}</span> : null}
    </div>
  );
}