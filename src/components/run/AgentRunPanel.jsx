import { useEffect, useState } from "react";
import { useRun } from "../../state/RunContext";
import { EventEmitter } from "../../mock/emitter";
import successEvents from "../../mock/fixtures/run_success.json";
import errorEvents from "../../mock/fixtures/run_error.json";
import RunHeader from "./RunHeader";
import TaskList from "../task/TaskList";
import FinalOutput from "./FinalOutput";
import AgentThoughts from "./AgentThoughts";

export default function AgentRunPanel() {
  const { state, dispatch } = useRun()

  const [activeFixture, setActiveFixture] = useState("success"); // toggle success and error mocks  

  const isIdle = state.run.status === "idle";

  useEffect(() => {

    //reset run when component mounts before starting the mock run
    dispatch({ type: "reset_run" })

    const events = activeFixture === "success" ? successEvents : errorEvents;

    const emitter = new EventEmitter(events, dispatch, 10);
    emitter.play();

    return () => emitter.stop();
  }, [dispatch, activeFixture]);

  if (isIdle) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-lg font-medium">No active run</p>
        <p className="text-sm mt-2">
          Submit a query to start analysis
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setActiveFixture("success")}
          className={`px-4 py-2 rounded text-sm font-medium ${activeFixture === 'success' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Run Success Path
        </button>
        <button
          onClick={() => setActiveFixture("error")}
          className={`px-4 py-2 rounded text-sm font-medium ${activeFixture === 'error' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Run Error Path
        </button>
      </div>

      <RunHeader />
      <FinalOutput />
      <AgentThoughts />
      <TaskList />
    </div>
  );
}