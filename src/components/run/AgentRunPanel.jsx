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

  const [activeFixture, setActiveFixture] = useState("success");

  const isIdle = state.run.status === "idle";

  useEffect(() => {
    dispatch({ type: "reset_run" })

    const events = activeFixture === "success" ? successEvents : errorEvents;

    const emitter = new EventEmitter(events, dispatch, 10);
    emitter.play();

    return () => emitter.stop();
  }, [dispatch, activeFixture]);

  if (isIdle) {
    return (
      <div className="p-10 mt-10 text-center text-muted-foreground bg-card/40 border border-border/50 max-w-xl mx-auto rounded-xl glass shadow-lg">
        <p className="text-xl font-semibold text-foreground tracking-tight">No active run</p>
        <p className="text-sm mt-3 opacity-80">
          Submit a query to start analysis and view the agent's progress
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <div className="flex gap-3 mb-6 p-1 bg-card/60 w-fit rounded-lg border border-border/50 backdrop-blur-sm">
        <button
          onClick={() => setActiveFixture("success")}
          className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${activeFixture === 'success' ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(129,140,248,0.25)]' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
        >
          Run Success Path
        </button>
        <button
          onClick={() => setActiveFixture("error")}
          className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${activeFixture === 'error' ? 'bg-destructive text-destructive-foreground shadow-[0_0_15px_rgba(248,113,113,0.25)]' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
        >
          Run Error Path
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden shadow-2xl">
        <RunHeader />
        <div className="p-6">
          <FinalOutput />
          <AgentThoughts />
          <TaskList />
        </div>
      </div>
    </div>
  );
}