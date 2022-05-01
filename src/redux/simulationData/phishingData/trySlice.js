import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  newkey: {
    halo: false,
    halo2: {
      1: {
        name: "phishing",
        type: {
          name: ["test"],
        },
      },
    },
  },
  oldkey: {
    halo2: [
      {
        id: "1",
        name: "phishing",
        type: {
          name: ["old test"],
        },
      },
    ],
  },
};

export const trySlice = createSlice({
  name: "try",
  initialState,
  reducers: {
    setEntireSlice: (state, action) => {
      console.log(action.payload);
      state.newkey = action.payload;
      console.log("Entire slice is set!");
    },
  },
});

// Action creators are generated for each case reducer function
export const {setEntireSlice} = trySlice.actions;

export default trySlice.reducer;
