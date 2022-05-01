import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTimerRunning: false,
  latestTopic: "",
  started: false,
  //TODO: SHOULD BE FROM BACKEND AS WELL JUST FOR DEMO PURPOSE
  //TODO: remaining time, is completed, checkpoints UUID
  simulationCompletionStatus: {
    phishing: false,
    password: true,
    simulation3: false,
    simulation4: false,
  },
  firstRemainingTimerSet: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    // We need to create a new reducer also, that dynamically adds a remainingTime key to the state
    // For example, action.payload.name = "phishingRemaining", then in the reducer, we need to create a "phishingRemainingTime" key in state
    createTimer: (state, action) => {
      // state = {
      //   ...state,
      //   keyName: action.payload.timeRemaining,
      // };
      state[action.payload.simulationName] = null;
    },
    setTimer: (state, action) => {
      state[action.payload.simulationRemainingTime] = action.payload.timeRemaining;
      //console.log("time parameter : ", state.phishingRemainingTime);
    },
    decrementTimer: (state) => {
      state.seconds -= 1;
    },
    setIsTimerRunning: (state, action) => {
      state.isTimerRunning = action.payload;
      // console.log("isTimerRunning is set");
      // console.log("is timer running : ", state.isTimerRunning);
    },
    stopTimer: (state, action) => {
      state.seconds += 1;
      // const path = action.payload.location.pathname;
      // const pathName = path.substring(path.lastIndexOf("/") + 1);
      // console.log("remaining seconds: ", action.payload.remainingSeconds);
      //send data to backend
    },
    setLatestTopic: (state, action) => {
      state.latestTopic = action.payload;
    },
    setStarted: (state, action) => {
      state.started = action.payload;
    },
    setSimulationCompletionStatus: (state, action) => {
      state.simulationCompletionStatus[action.payload.simulationName] =
        action.payload.status;
    },
    setFirstRemainingTimer: (state, action) => {
      state.firstRemainingTimerSet = action.payload;
      //console.log("First Remaining Timer : ", state.firstRemainingTimerSet);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  stopTimer,
  setTimer,
  countdownTimer,
  decrementTimer,
  setIsTimerRunning,
  setLatestTopic,
  setStarted,
  setSimulationCompletionStatus,
} = timerSlice.actions;

export default timerSlice.reducer;
