import { useRun } from "../../state/RunContext";

export default function AgentThoughts() {
  const { state } = useRun();

  if (!state.thoughts.length) return null;

  return (
    <div className="p-4 border rounded mb-4 bg-gray-50">
      <h4 className="text-sm font-semibold mb-2 text-gray-600">
        Agent Thoughts
      </h4>

      <div className="space-y-1 text-sm text-gray-700">
        {state.thoughts.map((t, idx) => (
          <div key={idx}>
            <span className="font-medium">
              {t.taskId || "system"}:
            </span>{" "}
            {t.thought}
          </div>
        ))}
      </div>
    </div>
  );
}