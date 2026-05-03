import { produce } from "immer";
import { initialState } from "./initialState";

export const runReducer = produce((draft, event) => {
  switch (event.type) {

    case "run_started": {
      draft.run = {
        id: event.run_id,
        query: event.query,
        status: "running",
        startTime: event.timestamp,
        duration: 0,
      };
      break;
    }

    case "agent_thought": {
      draft.thoughts.push({
        taskId: event.task_id,
        thought: event.thought,
        timestamp: event.timestamp,
      });
      break;
    }

    case "task_spawned": {
      draft.tasks[event.task_id] = {
        id: event.task_id,
        label: event.label,
        agent: event.agent,
        status: "running",
        history: [{ status: "running", timestamp: event.timestamp }],
        toolCalls: [],
        outputs: [],
        parallelGroup: event.parallel_group,
        dependsOn: event.depends_on,
        retries: 0,
      };
      break;
    }

    case "tool_call": {
      const task = draft.tasks[event.task_id];
      if (!task) break;

      task.toolCalls.push({
        tool: event.tool,
        input: event.input_summary,
        status: "calling",
      });

      break;
    }

    case "tool_result": {
      const task = draft.tasks[event.task_id];
      if (!task) break;

      const lastCall = task.toolCalls[task.toolCalls.length - 1];
      if (lastCall) {
        lastCall.status = "completed";
        lastCall.output = event.output_summary;
      }

      break;
    }

    case "partial_output": {
      const task = draft.tasks[event.task_id];
      if (!task) break;

      task.outputs.push({
        content: event.content,
        isFinal: event.is_final,
        quality: event.quality_score,
      });

      if (event.is_final) {
        task.status = "complete";
        task.history.push({ status: "complete", timestamp: event.timestamp });
      }

      break;
    }

    case "task_update": {
      const task = draft.tasks[event.task_id];
      if (!task) break;

      if (event.status === "failed") {
        task.status = "failed";
        task.error = event.error;
        task.retries += 1;
      }

      if (event.status === "running") {
        task.status = "running";
      }

      if (event.status === "cancelled") {
        task.status = "cancelled";
        task.reason = event.reason;
        task.message = event.message;
      }
      task.history.push({
        status: event.status,
        timestamp: event.timestamp,
      });

      break;
    }

    case "run_complete": {
      draft.run.status = "complete";
      draft.run.duration = event.duration_ms;

      draft.finalOutput = event.output;
      break;
    }

    case "run_error": {
      draft.run.status = "failed";
      draft.run.error = event.message;
      break;
    }

    case "reset_run": {
      return initialState; 
    }

    default:
      break;
  }
});