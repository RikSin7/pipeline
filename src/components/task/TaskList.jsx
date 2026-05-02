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
      {groupedTasks.map((group, idx) => (
        <div key={idx} className="flex gap-4">
          {group.map((task) => (
            <div key={task.id} className="flex-1">
              <TaskCard task={task} />
            </div>
          ))}
          {group.length > 1 && (
            <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mt-2 flex items-center justify-center -rotate-90 origin-left translate-x-4 opacity-50">
              Parallel tasks
            </div>
          )}
        </div>
      ))}
    </div>
  );
}