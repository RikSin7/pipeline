import { createContext, useContext, useReducer } from "react";
import { runReducer } from "./runReducer";
import { initialState } from "./initialState";

const RunContext = createContext(null);

export function RunProvider({ children }) {
    const [state, dispatch] = useReducer(runReducer, initialState);

    return (
        <RunContext.Provider value={{ state, dispatch }}>
            {children}
        </RunContext.Provider>
    );
}

export const useRun = () => {
    const context = useContext(RunContext);

    if (!context) {
        throw new Error("useRun must be used within RunProvider");
    }

    return context;
};