export const initialState = {
  run: {
    id: null,
    query: "",
    status: "idle", // running | complete | failed
    startTime: null,
    duration: 0,
  },

  tasks: {},

  thoughts: [],

  finalOutput: null,
};