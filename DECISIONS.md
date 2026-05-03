# Architectural & UX Decisions

This document outlines the reasoning behind how five intentionally under-specified requirements were handled in the Agent Run Panel. The core philosophy driving these choices is that the target user is a financial analyst—not a software engineer. They need enough visibility to trust the system without being overwhelmed by debug-level telemetry.

### 1. Agent Thoughts — Visibility Strategy

**Decision:**
Agent thoughts are displayed in a dedicated section (AgentThoughts) below the final output and above the task list. All thoughts are shown inline, including coordinator-level thoughts and task-level thoughts.

**Why:**
The primary user of this system is a financial analyst, not a developer. Therefore, thoughts are useful for transparency but should not overwhelm the main task flow. By placing them in a separate section, we preserve visibility without cluttering individual task cards.

**Reconsideration Trigger:**
If user analytics show that analysts find the thoughts block distracting or confusing, or if the volume of thoughts scales to the point of pushing the actual task cards below the fold, or If users were primarily debugging the system (e.g., internal engineers), I would reconsider and collapse them behind a "View Reasoning" toggle.

### 2. Parallel Task Layout (when parallel task ids are grouped)

**Decision:**
Grouped parallel tasks are rendered in a distinct "Vertical Bracket Layout" (a stacked column with a visual connecting line and a "Parallel Execution Batch" header). 

**Why:**
While a horizontal layout theoretically communicates concurrency well, it completely falls apart on mobile devices or when an agent spawns more than 3 parallel tasks (leading to messy horizontal scrolling). By stacking them vertically but nesting them inside a distinct visual bracket with a shared header, we achieve the best of both worlds: we clearly communicate that these tasks belong to the same concurrent execution batch, while maintaining a clean, responsive, and infinitely scalable UI.

**Reconsideration Trigger:**
If user analytics show that analysts are mistaking the vertical stack for sequential execution despite the bracket grouping, I would reconsider adding explicit timestamp overlaps or a mini Gantt-chart visualization to reinforce the concurrency.

### 3. Partial Outputs (`is_final: false`)

**Decision:**
Partial outputs are streamed directly inside the task card under a "Findings" section as they arrive. They are styled slightly dimmer than final outputs. I chose not to overwrite them when the final output arrives, but instead stack them.

**Why:**
Analysts care about data. Seeing partial outputs stream in (e.g., "Apple R&D spend: 2019 $16.2B...") provides immediate dopamine and confirms the system is actually reading real numbers. Stacking them provides a breadcrumb trail of the agent's discoveries leading up to its final synthesis, which helps the analyst audit the final result.

**Reconsideration Trigger:**
If an agent is overly verbose and emits dozens of partial outputs per task (creating massive vertical bloat), I would switch to a model where intermediate outputs overwrite each other inline, and only the `is_final: true` output is preserved in the UI.

### 4. Cancelled Status (`reason: "sufficient_data"`)

**Decision:**
The cancelled status is treated as a neutral, non-alarming event. It is styled with muted gray colors, a "Cancelled" status badge, and an explanatory box explicitly labeled "Intentional Halt." It avoids red or orange warning colors entirely.

**Why:**
To an analyst, the word "cancelled" or "failed" without context usually implies a bug. But in this architecture, cancelling a task because we already have enough data is a feature—it saves time and API costs. By keeping the accurate "Cancelled" badge but pairing it immediately with an "Intentional Halt" explanation and muted styling, we communicate that the system is being smart and efficient, rather than broken.

**Reconsideration Trigger:**
If user feedback indicates that analysts still feel anxious seeing the word "Cancelled" (i.e., they worry they are missing out on valuable data), I would reconsider the badge label, perhaps changing it to "Data Satisfied" or "Skipped" and using a slightly positive visual cue.

### 5. Task Dependency Display

**Decision:**
Dependencies are displayed dynamically in the header of the task card. The UI calculates in real-time whether the current task's dependencies are resolved. If blocked, it displays a pulsing warning (`⏳ Waiting on: t_001`). Once dependencies are complete or cancelled, it transitions to a muted confirmation (`✓ Depended on: t_001`). The UI avoids complex graph arrows.

**Why:**
Drawing a full Directed Acyclic Graph (DAG) is overkill for this use case and often confusing for non-engineers. However, just showing a static text list isn't enough. By making the dependency badge dynamic, the analyst immediately understands *why* a spawned task hasn't started yet (it's waiting!). This builds massive trust in the system's orchestration intelligence without cluttering the UI with lines.

**Reconsideration Trigger:**
If the workflows become highly complex (e.g., nested dependencies spanning dozens of tasks), a simple array of IDs will become meaningless even with dynamic badges. At that scale, I would reconsider and implement a simplified visual dependency tree or a mini-map to help users orient themselves.

## Additional Notes

### State Management

**Decision:**
Used useReducer with Immer for state management instead of Redux or multiple useState hooks.

**Why:**
The system is inherently event-driven, and each incoming event maps naturally to a reducer action. This keeps state transitions centralized, predictable, and easy to reason about.

**Tradeoff:**
Redux Toolkit would provide additional tooling and dev experience benefits but introduces unnecessary boilerplate for this scope.

### Data Structure Choice

**Decision:**
Tasks are stored as an object (tasks: { [taskId]: task }) rather than an array.

**Why:**
Frequent updates to tasks (by task_id) require O(1) access. Using an object avoids repeated array searches and simplifies reducer logic.

**Tradeoff:**
Requires conversion (Object.values) when rendering.

