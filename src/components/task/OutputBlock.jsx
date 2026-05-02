export default function OutputBlock({ output }) {
  return (
    <div className={`text-sm p-2 rounded ${output.isFinal ? "bg-green-50 text-green-800" : "bg-gray-50 text-gray-600"}`}>
      <span className="opacity-50 mr-2">↳</span>
      {output.content}
      {output.quality ? <h1 className="text-green-500">{output.quality}</h1> : null}
    </div>
  );
}