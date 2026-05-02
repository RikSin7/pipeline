import OutputBlock from "./OutputBlock";
import ToolCall from "./ToolCall";
import StatusBadge from "../common/StatusBadge";

export default function TaskCard({ task }) {

  const borderColor =
    task.status === "complete" ? "border-green-200" :
      task.status === "failed" ? "border-red-200" :
        task.status === "cancelled" ? "border-gray-200" :
          "border-blue-200";

  return (
    <div className={`border rounded-lg p-4 transition-all duration-300 bg-white ${borderColor}`}>

      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">{task.label}</h4>
          <div className="flex gap-2 items-center mt-1">
            <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              🤖 {task.agent}
            </span>
            {task.retries > 0 && (
              <span className="text-xs text-orange-600 font-medium">
                Retried {task.retries}x
              </span>
            )}
          </div>
        </div>

        
        {task.dependsOn?.length > 0 && (
          <div className="text-xs text-gray-500 mb-2">
            Depends on: {task.dependsOn.join(", ")}
          </div>
        )}

        {/* Dynamic Status Badge */}
        <StatusBadge status={task.status} />

      </div>

      {/* --- ERROR & CANCEL STATES --- */}
      {task.status === "failed" && task.error && (
        <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-100">
          <strong>Error:</strong> {task.error}
        </div>
      )}

      {task.status === "cancelled" && task.reason && (
        <div className="mb-3 text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 border-l-4 border-l-gray-400">
          <strong>Intentional Halt:</strong> {task.message || task.reason}
        </div>
      )}

      {/* TOOL CALLS */}
      {task.toolCalls?.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Actions</p>
          <div className="space-y-1">
            {task.toolCalls.map((call, idx) => <ToolCall key={idx} call={call} />)}
          </div>
        </div>
      )}

      {/* PARTIAL OUTPUTS */}
      {task.outputs?.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Findings</p>
          <div className="space-y-2">
            {task.outputs.map((output, idx) => <OutputBlock key={idx} output={output} />)}
          </div>
        </div>
      )}

      {task.history?.length > 0 && (
        <div className="mt-2 text-xs text-gray-400">
          History: {task.history.map((h, i) => (
            <span key={i}>
              {h.status}
              {i < task.history.length - 1 && " → "}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}