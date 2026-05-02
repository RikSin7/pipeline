import { useRun } from "../../state/RunContext";

export default function FinalOutput() {
  const { state } = useRun();
  const output = state.finalOutput;

  if (!output) return null;

  return (
    <div className="p-4 border bg-green-50 rounded mb-4">
      <h3 className="font-semibold text-lg mb-2">Final Output</h3>

      <p className="text-sm">{output.summary || "No summary available"}</p>

      {output.citations && (
        <div className="mt-2 text-xs text-gray-600">
          {output.citations.map((c) => (
            <div key={c.ref_id}>
              {c.title} (p. {c.page})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}