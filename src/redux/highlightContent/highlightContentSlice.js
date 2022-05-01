import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  contentHighlighted: "",
};

const highlightContentSlice = createSlice({
  name: "highlightContent",
  initialState,
  reducers: {
    setContentHighlighted: (state, action) => {
      state.contentHighlighted = action.payload;
      // console.log(action);
    },
  },
});

// Action creators are generated for each case reducer function
export const {setContentHighlighted} = highlightContentSlice.actions;

export default highlightContentSlice.reducer;
