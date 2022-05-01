import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outlookSidebarItemSelected: "Inbox",
  inboxEmailCounter: 0,
  // deletedItemsCounter: 0,
};

const outlookSidebarSlice = createSlice({
  name: "outlookSideBar",
  initialState,
  reducers: {
    selectOutlookSidebarItem: (state, action) => {
      state.outlookSidebarItemSelected = action.payload;
      // console.log(action);
    },
    setEmails: (state, action) => {
      if (action.payload.name === "Inbox") {
        state.inboxEmailCounter = action.payload.amount;  
      } else if (action.payload.name === "DeletedItems") {
        state.deletedItemsCounter = action.payload.amount;
      }
    },
    increaseInboxEmailCounter: (state) => {
      state.inboxEmailCounter += 1;
    },
    decreaseInboxEmailCounter: (state) => {
      state.inboxEmailCounter -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  selectOutlookSidebarItem,
  setEmails,
  increaseInboxEmailCounter,
  decreaseInboxEmailCounter,
} = outlookSidebarSlice.actions;

export default outlookSidebarSlice.reducer;
