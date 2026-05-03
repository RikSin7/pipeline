# JcurveIQ Agent Run Panel

This repository contains the frontend implementation for the JcurveIQ take-home assessment. The project implements a real-time, live-updating Agent Run Panel designed to make complex, multi-agent orchestration legible and trustworthy for financial analysts.

The UI is built with a premium, glassmorphism-inspired dark mode aesthetic using Tailwind CSS v4, ensuring it looks and feels like a high-end enterprise tool.

## Setup & Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. Open your browser to the local URL provided by Vite (typically `http://localhost:5173`).

## How to Switch Between Fixtures

The UI provides built-in toggle buttons at the top of the panel to seamlessly switch between the mock event streams.

- Click **"Run Success Path"** to execute the `run_success.json` fixture. This fixture demonstrates a complete, complex workflow including parallel task spawning, rate-limit failures followed by retries, intentional task cancellations (`sufficient_data`), partial outputs, and a final synthesis.
- Click **"Run Error Path"** to execute the `run_error.json` fixture. This demonstrates how the UI handles unexpected, unrecoverable system failures mid-flight.

When you toggle between these paths, the application automatically clears the existing global state and replays the new event stream using a scaled timeout emitter to simulate realistic, live network delays.

## Known Gaps & Future Improvements

If I had more time to expand this project, I would address the following gaps:

1. **Accessibility (a11y) & Screen Readers:**
   While the visual hierarchy is strong, the dynamic nature of streaming tasks needs `aria-live` regions so screen readers announce task completions and tool calls properly without overwhelming the user.

2. **Responsive Parallel Rendering:**
   Currently, parallel tasks are rendered horizontally using flexbox. This works beautifully for 3-4 tasks, but on mobile devices or if an agent spawns 10 parallel tasks, it will cause horizontal scrolling. I would implement a masonry grid or a responsive breakpoint that converts them to a compact vertical stack on smaller screens.

3. **Virtualization for Long Runs:**
   If an orchestration run involves 50+ tasks and hundreds of partial outputs, the DOM could become bloated. I would implement list virtualization (e.g., using `@tanstack/react-virtual` or `react-virtuoso`) to ensure 60fps scrolling performance regardless of how large the task log grows.

4. **Real-time Data Fetching:**
   Currently, the application uses mock event streams. With more time, I would implement a real-time data fetching mechanism to fetch data from actual sources.

## Stack Used
- React 19
- Vite
- Tailwind CSS v4
- Immer (for clean, immutable state updates in the reducer)
