import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  loginPrompt: false,
  displayToast: false,
  toastMsg: "",
  tourIdx: 0,
  contentHighlighted: "",
  isTourRunning: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoginPrompt: (state, action) => {
      state.loginPrompt = action.payload;
      // console.log(action);
    },
    setDisplayToast: (state, action) => {
      state.displayToast = action.payload;
    },
    setToastAndMsg: (state, action) => {
      state.displayToast = action.payload.displayToast;
      state.toastMsg = action.payload.toastMsg;
    },
    setToastMsg: (state, action) => {
      state.toastMsg = action.payload;
    },
    setTourIdx: (state, action) => {
      state.tourIdx = action.payload;
    },
    setIsTourRunning: (state, action) => {
      state.isTourRunning = action.payload;
    },
    setContentHighlighted: (state, action) => {
      state.contentHighlighted = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoginPrompt,
  setDisplayToast,
  setToastAndMsg,
  setToastMsg,
  setTourIdx,
  setIsTourRunning,
  setContentHighlighted,
} = generalSlice.actions;

export default generalSlice.reducer;
