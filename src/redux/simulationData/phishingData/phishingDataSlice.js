import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  //tab
  tabSelected: "Out1ook",
  tabArr: ["Out1ook"],
  allTab: [],
  urlStatus: false,

  //phishingdata
  inboxSelected: -1,
  doneTutorial: false,
  // DoingTutorial for the highlighted Email in tutorial4
  doingTutorial: true,
  tutorialIdx: 0,
  contentHighlighted: "",
  bookmarkList: [],
  markedAsReadList: [],
  inboxTimedArr: [],
  inboxArr: [],
  reportedPhishList: [],
  reportedInboxId: -1,
  inboxNewestId: 7,
  nonce: 0, //Used for triggering rerender when email is reported
  incomingEmail: false,
  accountVerified: false,
  checkpoint8Done: false,
  selectedBeforeInboxList: [],
  selectedBeforeTab2: false,
  tab2TimeoutTriggered: false,
  nextInboxAppearanceTiming: 100000,
  hintsTimeout: null,
  lastReminder: false,
};

const highlightedContent = [
  "",
  "inboxMenu",
  "inboxMenu",
  "inboxContent",
  "actionBar",
];

export const phishingDataSlice = createSlice({
  name: "phishingData",
  initialState,
  reducers: {
    // selectInbox: (state, action) => {
    //   state.inboxSelected = action.payload;
    //   console.log("Inbox Selected: "+action.payload);
    // },

    //tab
    selectTab: (state, action) => {
      state.tabSelected = action.payload;
      console.log("select tab ", action.payload);
    },
    setTab: (state, action) => {
      // Only add the first tab when the user is first time entering the simulation
      // if (state.inboxSelected === -1) {
      //   state.tabArr = [[...action.payload][0]];
      //   // state.tabSelected = state.tabArr[0].tab_name;
      // } else {
      // }
      state.tabArr = [...action.payload];
      console.log(
        `%cPhishing Tab Arr is set : ${state.tabArr}`,
        "color: #FED800"
      );
    },
    setAllTab: (state, action) => {
      state.allTab = [...action.payload];
    },
    setUrlStatus: (state, action) => {
      state.urlStatus = action.payload;
    },

    //phishing data
    setDoneTutorial: (state, action) => {
      state.doneTutorial = action.payload;
    },
    setDoingTutorial: (state, action) => {
      state.doingTutorial = action.payload;
    },
    setTutorialIdx: (state, action) => {
      console.log("tutorialIdx : ", action.payload);
      state.tutorialIdx = action.payload;
      state.contentHighlighted = highlightedContent[action.payload];
    },

    setBookmarkedContent: (state, action) => {
      state.bookmarkList = [...action.payload];
    },
    //After the user has flagged/ unflag more than once
    toggleBookmarkedContent: (state, action) => {
      const emailId = action.payload;
      const bookmarkList = state.bookmarkList;
      const index = bookmarkList.indexOf(emailId);
      //if inside remove
      if (index > -1) {
        console.log("remove bookmarked content");
        bookmarkList.splice(index, 1);
        state.bookmarkList = [...bookmarkList];
        //if not inside remove
      } else {
        state.bookmarkList = [...state.bookmarkList, emailId];
      }
    },
    removeBookmarkedContent: (state, action) => {
      const emailId = action.payload;
      const bookmarkList = state.bookmarkList;
      const index = bookmarkList.indexOf(emailId);
      //if inside remove
      if (index > -1) {
        console.log("remove bookmarked content");
        bookmarkList.splice(index, 1);
        state.bookmarkList = [...bookmarkList];
      }
    },
    setMarkedAsReadContent: (state, action) => {
      state.markedAsReadList = [...action.payload];
    },

    toggleMarkedAsReadContent: (state, action) => {
      const emailId = action.payload;
      const markedAsReadList = state.markedAsReadList;
      const index = markedAsReadList.indexOf(emailId);

      //if inside remove
      if (index > -1) {
        markedAsReadList.splice(index, 1);
        state.markedAsReadList = [...markedAsReadList];
        //if not inside remove
      } else {
        state.markedAsReadList = [...state.markedAsReadList, emailId];
      }
    },

    addMarkedAsReadContent: (state, action) => {
      const emailId = action.payload;
      if (!state.markedAsReadList.includes(emailId)) {
        state.markedAsReadList = [...state.markedAsReadList, emailId];
      }
      console.log(state.markedAsReadList);
    },

    removeMarkedAsReadContent: (state, action) => {
      const emailId = action.payload;
      const markedAsReadList = state.markedAsReadList;
      const index = markedAsReadList.indexOf(emailId);
      if (index > -1) {
        markedAsReadList.splice(index, 1);
        state.markedAsReadList = [...markedAsReadList];
      }
    },

    setInboxArr: (state, action) => {
      // From backend (called from phishingStartWindow)
      state.inboxArr = action.payload;
      state.inboxTimedArr = action.payload.slice(0, 2);
      state.inboxNewestId = action.payload.length;
      // console.log("slice is array : ", Array.isArray(state.inboxTimedArr));
    },
    setInboxTimedArr: (state, action) => {
      state.inboxTimedArr = [...action.payload];
    },
    // TODO: Combine the addEmail and reportPhishing together
    addEmail: (state, action) => {
      state.inboxTimedArr = [...state.inboxTimedArr, action.payload];
    },
    setReportPhishingList: (state, action) => {
      state.reportedPhishList = [...action.payload];
    },
    setReportedInboxId: (state, action) => {
      state.reportedInboxId = action.payload;
    },
    reportPhishing: (state, action) => {
      // Render a new template response
      state.inboxTimedArr = state.inboxTimedArr.filter(
        (mail) => mail.email_id !== action.payload
      );
      let exists = state.reportedPhishList.find((e) => e == action.payload);
      if (!exists) {
        state.reportedPhishList = [...state.reportedPhishList, action.payload];
      } else {
        console.log(
          "Duplicate email found when reporting email ****: " + exists
        );
      }
      console.log("FILTERED : ", state.reportedPhishList);
    },
    selectInbox: (state, action) => {
      state.inboxSelected = action.payload;
      console.log("******Inbox selected: ", action.payload);
    },
    addNonce: (state) => {
      state.nonce = state.nonce + 1;
    },
    setIncomingEmail: (state, action) => {
      console.log("INCOMING EMAIL FOR" + action.payload + "has been pushed");
      state.incomingEmail = action.payload;
    },
    setInboxNewestId: (state, action) => {
      state.inboxNewestId = action.payload;
    },
    setAccountVerified: (state, action) => {
      state.accountVerified = action.payload;
    },
    setCheckpoint8Done: (state, action) => {
      state.checkpoint8Done = action.payload;
    },
    setSelectedBeforeInboxList: (state, action) => {
      state.selectedBeforeInboxList = [...action.payload];
    },
    addSelectedBeforeInboxList: (state, action) => {
      state.selectedBeforeInboxList = [
        ...state.selectedBeforeInboxList,
        action.payload,
      ];
    },
    setSelectedBeforeTab2: (state, action) => {
      state.selectedBeforeTab2 = action.payload;
    },
    setNextInboxAppearanceTiming: (state, action) => {
      state.nextInboxAppearanceTiming = action.payload;
    },
    setContentHighlighted: (state, action) => {
      state.contentHighlighted = action.payload;
    },
    setTab2TimeoutTriggered: (state, action) => {
      state.tab2TimeoutTriggered = action.payload;
    },
    setHintsTimeout: (state, action) => {
      state.hintsTimeout = action.payload;
    },
    setLastReminder: (state, action) => {
      state.lastReminder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  //tab
  selectTab,
  setAllTab,
  setUrlStatus,
  setTab,

  //phishing simulation
  addEmail,
  setDoneTutorial,
  setDoingTutorial,
  setTutorialIdx,
  setBookmarkedContent,
  toggleBookmarkedContent,
  removeBookmarkedContent,
  setMarkedAsReadContent,
  toggleMarkedAsReadContent,
  addMarkedAsReadContent,
  removeMarkedAsReadContent,
  setInboxArr,
  setInboxTimedArr,
  reportPhishing,
  selectInbox,
  setIncomingEmail,
  setReportPhishingList,
  setReportedInboxId,
  setInboxNewestId,
  setAccountVerified,
  setId4SelectedBefore,
  setUpdateInboxCounter,
  setCheckpoint8Done,
  setSelectedBeforeInboxList,
  addSelectedBeforeInboxList,
  setSelectedBeforeTab2,
  setNextInboxAppearanceTiming,
  setContentHighlighted,
  addNonce,
  setTab2TimeoutTriggered,
  setHintsTimeout,
  setLastReminder,
} = phishingDataSlice.actions;

export default phishingDataSlice.reducer;
