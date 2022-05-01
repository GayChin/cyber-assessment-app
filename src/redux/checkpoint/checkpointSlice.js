import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  checkpoints: {
    checkpoint1: false,
    checkpoint2: false,
    checkpoint3: false,
    checkpoint4: false,
    checkpoint5: true,
    checkpoint6: false,
    checkpoint7: false,
    checkpoint8: false,
    checkpoint9: false,
    checkpoint10: true,
    checkpoint11: false,
    checkpoint12: true,
  },
};

const checkpointSlice = createSlice({
  name: "checkpoint",
  initialState,
  reducers: {
    setCheckpoint: (state, action) => {
      state.checkpoints[action.payload.checkpointName] = action.payload.status;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCheckpoint} = checkpointSlice.actions;

export default checkpointSlice.reducer;
