export default function ToolCall({ call }) {
  const isDone = call.status === "completed";
  
  return (
    <div className="text-sm font-mono bg-gray-50 p-1.5 rounded text-gray-700 flex justify-between">
      <span><span className="text-blue-500 mr-1">ƒ</span>{call.tool}({call.input})</span>
      <span className={isDone ? "text-green-600" : "text-gray-400 animate-pulse"}>
        {isDone ? "Done" : "Waiting..."}
      </span>
    </div>
  );
}