import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  progressValues: [6, 12],
  improvementList: [0, 1],
  tabSelected: "Recommended",
};

const dashboardDataSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {
    setProgressValues: (state, action) => {
      state.progressValues = action.payload;
    },
    setImprovementList: (state, action) => {
      state.improvementList = action.payload;
    },
    setTabSelected: (state, action) => {
      state.tabSelected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setProgressValues, setImprovementList, setTabSelected} =
  dashboardDataSlice.actions;

export default dashboardDataSlice.reducer;
