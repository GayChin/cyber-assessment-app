import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  simulationList: [], // array of objects
  simulationIsLoading : true,
  sidebarIsLoading : true,
  simulationRecord : {},
};

const simulationsSlice = createSlice({
  name: "simulations",
  initialState,
  reducers: {
    setSimulations: (state, action) => {
      console.log("setting simulation in redux")
      state.simulationList = action.payload;
    },
    setSimulationIsLoading : (state,action) => {
      console.log("loading is set to: ", action.payload);
      state.simulationIsLoading = action.payload
    },
    setSidebarIsLoading : (state,action) => {
      console.log("sidebar is set.");
      state.sidebarIsLoading = action.payload
    },
    setSimulationRecord : (state,action) => {
      state.simulationRecord = {...action.payload}
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSimulations, setSimulationIsLoading, setSidebarIsLoading, setSimulationRecord } = simulationsSlice.actions;

export default simulationsSlice.reducer;
