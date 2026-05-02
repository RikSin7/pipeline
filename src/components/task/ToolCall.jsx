export default function ToolCall({ call }) {
  const isDone = call.status === "completed";
  
  return (
    <div className={`text-xs font-mono p-2.5 rounded-lg flex justify-between items-center transition-all border ${isDone ? 'bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/50' : 'bg-primary/5 border-primary/30 text-foreground shadow-sm shadow-primary/5'}`}>
      <span className="flex items-center gap-2 truncate pr-4">
        <span className="text-primary font-bold text-sm">ƒ</span>
        <span className="font-semibold text-card-foreground">{call.tool}</span>
        <span className="opacity-50 truncate">({call.input})</span>
      </span>
      <span className={`text-[10px] px-2 py-1 rounded uppercase tracking-widest font-bold whitespace-nowrap ${isDone ? "text-success bg-success/10 border border-success/20" : "text-primary bg-primary/10 border border-primary/20 animate-pulse"}`}>
        {isDone ? "Done" : "Waiting"}
      </span>
    </div>
  );
}