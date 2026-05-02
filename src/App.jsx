import AgentRunPanel from "./components/run/AgentRunPanel"
import { RunProvider } from "./state/RunContext"

function App() {
  return (
    <RunProvider>
      <AgentRunPanel />
    </RunProvider>
  )
}

export default App