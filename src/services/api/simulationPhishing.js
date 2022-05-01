import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const getSimulationPhishing = async () => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(`/simPhishing`, {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    console.log(
      "%cGET SIMULATION PHISHING SUCCESS *********",
      "color: #2AC54D"
    );
    return result.data;
  } catch (err) {
    console.log("%cGET SIMULATION PHISHING ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const upsertSimulationPhishing = async () => {
  try {
    const access_token = store.getState().user.user.access_token;

    const allTab = store.getState().phishingData.allTab;
    const openingTab = store.getState().phishingData.tabArr;

    const openingTabs = [];
    openingTab.forEach((OTab,index) => {
      const currentTabId = allTab.filter((ATab) => {
        return ATab.tab_name === OTab.tab_name;
      })[0].tab_id;
      const tabObj = {order: index, tab_id: currentTabId};
      openingTabs.push(tabObj);
      console.log("Opening Tabs :" , openingTabs) 
    });

    const focusingTabName = store.getState().phishingData.tabSelected;
    const focusingTabId = allTab.filter(
      (tab) => tab.tab_name === focusingTabName
    )[0].tab_id;
    console.log("when upsert focusing tab id : " , focusingTabId)
    const timedInbox = [];
    const reduxTimedInbox = store.getState().phishingData.inboxTimedArr;
    reduxTimedInbox.forEach((inbox) => {
      let obj = {};
      obj.received_time = inbox.received_time;
      obj.email_id = inbox.email_id;
      timedInbox.push(obj);
    });

    const result = await axiosInstance.post(
      `/simPhishing/`,
      {
        focusing_tab_id: focusingTabId,
        opening_tabs: openingTabs,
        has_done_tutorial: store.getState().phishingData.doneTutorial,
        is_doing_tutorial: store.getState().phishingData.doingTutorial,
        tutorial_idx: store.getState().phishingData.tutorialIdx,
        focusing_email_id: store.getState().phishingData.inboxSelected,
        timed_inbox: timedInbox,
        bookmarked_email_ids: store.getState().phishingData.bookmarkList,
        marked_as_read_email_ids:
          store.getState().phishingData.markedAsReadList,
        reported_phish_email_ids:
          store.getState().phishingData.reportedPhishList,
        reported_email_newest_id: store.getState().phishingData.inboxNewestId,
        selected_email_ids:
          store.getState().phishingData.selectedBeforeInboxList,
        is_account_verified: store.getState().phishingData.accountVerified,
        is_tab2_selected_before:
          store.getState().phishingData.selectedBeforeTab2,
        is_checkpoint8_done: store.getState().phishingData.checkpoint8Done,
        next_email_appear_timing:
          store.getState().phishingData.nextInboxAppearanceTiming,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );

    console.log(
      "%cUPSERT SIMULATION PHISHING SUCCESS *********",
      "color: #2AC54D"
    );
    return result.data;
  } catch (err) {
    console.log(
      "%cUPSERT SIMULATION PHISHING ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};

// *** Ingore in API documentation ***
// export const updateSimulationPhishing = async (simPhishingDetails) => {
//   try {
//     const access_token = store.getState().user.user.access_token;
//     const result = await axiosInstance.put(
//       "/simPhishing/",
//       simPhishingDetails,
//       // Below are the Json Object structure for simPhishingDetails
//       // {
//       //   simulation_id: 4,
//       //   name: "Simulation 5",
//       //   url: "sim5",
//       // },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${access_token}`,
//         },
//       }
//     );
//     return result.data;
//   } catch (err) {
//     console.log("%cUPDATE SIMULATION PHISHING sERROR *********", "color: #FF0000");
//     console.log(JSON.stringify(err.message));
//   }
// };

export const deleteSimulationPhishing = async () => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.del(`/simPhishing/`, {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    console.log(
      "%cDELETE SIMULATION PHISHING SUCCESS *********",
      "color: #2AC54D"
    );
    return result.data;
  } catch (err) {
    console.log(
      "%cDELETE SIMULATION PHISHING ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};
