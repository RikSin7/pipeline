import { useRun } from "../../state/RunContext";
import TaskCard from "./TaskCard";
import { groupTasks } from "../../utils/groupTasks";

export default function TaskList() {
  const { state } = useRun();
  const groupedTasks = groupTasks(state.tasks);

  if (groupedTasks.length === 0) {
    return <div className="p-4 text-muted-foreground text-center italic opacity-70">No tasks executed yet...</div>;
  }

  return (
    <div className="space-y-6">
      {groupedTasks.map((group, idx) => {
        // Sequential Task
        if (group.length === 1) {
          return <TaskCard key={group[0].id} task={group[0]} />;
        }

        // Parallel Task Batch (Vertical Bracket Layout)
        return (
          <div key={idx} className="relative border border-primary/20 rounded-xl p-5 bg-primary/5">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <span className="text-[10px] font-bold uppercase tracking-widest">Parallel Execution Batch</span>
            </div>
            
            <div className="space-y-4 pl-4 border-l-2 border-primary/30">
              {group.map((task) => (
                <div key={task.id} className="relative">
                  {/* Visual connecting node line */}
                  <div className="absolute w-4 h-[2px] bg-primary/30 top-8 -left-4"></div>
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}