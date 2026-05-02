import { useRun } from "../../state/RunContext";
import TaskCard from "./TaskCard";
import { groupTasks } from "../../utils/groupTasks";

export default function TaskList() {
  const { state } = useRun();

  const groupedTasks = groupTasks(state.tasks);

  if (groupedTasks.length === 0) {
    return <div className="p-4 text-gray-500">No tasks yet...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {groupedTasks.map((group, idx) => (
        <div key={idx} className="flex gap-3">
          {group.map((task) => (
            <div key={task.id} className="flex-1">
              <TaskCard task={task} />
            </div>
          ))}
          {group.length > 1 && (
            <div className="text-xs text-gray-400 mb-1">
              Parallel tasks
            </div>
          )}
        </div>
      ))}
    </div>
  );
}