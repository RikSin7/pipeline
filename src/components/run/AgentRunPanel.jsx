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
  const { state, dispatch } = useRun();
  
  // Initialize to null so it stays idle on mount
  const [activeFixture, setActiveFixture] = useState(null);

  const isIdle = state.run.status === "idle";

  useEffect(() => {
    // Abort the effect if no fixture is selected yet
    if (!activeFixture) return;

    dispatch({ type: "reset_run" });

    const events = activeFixture === "success" ? successEvents : errorEvents;
    const emitter = new EventEmitter(events, dispatch, 2);
    
    emitter.play();

    return () => emitter.stop();
  }, [dispatch, activeFixture]);

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

      {isIdle ? (
        <div className="p-10 mt-10 text-center text-muted-foreground bg-card/40 border border-border/50 max-w-xl mx-auto rounded-xl glass shadow-lg">
          <p className="text-xl font-semibold text-foreground tracking-tight">No active run</p>
          <p className="text-sm mt-3 opacity-80">
            Select a path above to start the analysis and view the agent's progress.
          </p>
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden shadow-2xl">
          <RunHeader />
          <div className="p-6">
            <FinalOutput />
            <AgentThoughts />
            <TaskList />
          </div>
        </div>
      )}
      
    </div>
  );
}