import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentModule: 0,
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setCurrentModule: (state, action) => {
      state.currentModule = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCurrentModule} = moduleSlice.actions;

export default moduleSlice.reducer;
