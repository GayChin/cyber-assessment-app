import { store } from "../../redux/store.js"
import { phishingDataSlice } from "../../redux/simulationData/phishingData/phishingDataSlice"
import { getSimulationPhishing } from "../api/simulationPhishing.js"
import { reportTemplateItem } from "../../constant/reportTemplateItem.js"

export const fetchPhishingSimulation = async () => {
  const data = await getSimulationPhishing();

  if (data) {
    console.log(data[0].opening_tabs);

    //inboxArr
    store.dispatch(phishingDataSlice.actions.setInboxArr(data[0].inbox));

    //inboxTimedArr
    const timedInboxIds = [];
    const timedInboxes = data[0].timed_inbox;

    //contain all timedInbox.email_id
    timedInboxes.forEach((timedInbox) => {
      timedInboxIds.push(timedInbox.email_id);
    });

    // Filter the array and update the timedInboxArr
    // e.g time inbox has email id 1 - 3
    const filteredInboxArr = data[0].inbox.filter((inbox) => {
      return timedInboxIds.includes(inbox.email_id);
    });

    //Gay Chin Amazing Idea
    const finalizedTimedArr = []
    for (let i = 0; i < timedInboxes.length; i++) {
      let inboxObj = {}
      if (timedInboxes[i].email_id > 6) {
        //append report template here
        inboxObj = reportTemplateItem(timedInboxes[i].email_id)
      } else {
        for (let j = 0; j < data[0].inbox.length; j++) {
          if (timedInboxes[i].email_id === data[0].inbox[j].email_id) {
            //append 
            if (timedInboxes[i].received_time === 0) {
              timedInboxes[i].received_time = Math.trunc(Date.now() / 1000);
            }
            inboxObj = { ...timedInboxes[i], ...data[0].inbox[j] }
          }
        }
      }
      finalizedTimedArr.push(inboxObj)
    }

    console.log("filtered inbox arr :", finalizedTimedArr);
    store.dispatch(phishingDataSlice.actions.setInboxTimedArr(finalizedTimedArr));

    //phishing tab
    const allTabs = data[0].all_tabs;
    store.dispatch(phishingDataSlice.actions.setAllTab(allTabs));

    const emptyTabArr = []
    data[0].opening_tabs.forEach((tab) => {
      const currentTabName = allTabs.filter((singleTab) => {
        return singleTab.tab_id === tab.tab_id;
      })[0].tab_name;

      tab["tab_name"] = currentTabName;
      emptyTabArr.push(tab);
    });

    if (emptyTabArr) {
      console.log("emptyTabArr : ", emptyTabArr);
      // Sort by order here
      emptyTabArr.sort((a, b) => a.order - b.order)
      console.log("empty tab arr", emptyTabArr)
      store.dispatch(phishingDataSlice.actions.setTab(emptyTabArr));

    }

    // Setting the focusing tab id
    const focusTab = allTabs.filter((singleTab) => {
      return singleTab.tab_id === data[0].focusing_tab_id;
    })[0].tab_name;
    console.log("focusTab :", focusTab)
    store.dispatch(phishingDataSlice.actions.selectTab(focusTab));

    //doneTutorial
    store.dispatch(phishingDataSlice.actions.setDoneTutorial(data[0].has_done_tutorial));

    //doingTutorial
    store.dispatch(phishingDataSlice.actions.setDoingTutorial(data[0].is_doing_tutorial));

    //tutorialIdx
    store.dispatch(phishingDataSlice.actions.setTutorialIdx(data[0].tutorial_idx));

    //reported email newest id
    store.dispatch(phishingDataSlice.actions.setInboxNewestId(data[0].reported_email_newest_id));

    //account verified
    store.dispatch(phishingDataSlice.actions.setAccountVerified(data[0].is_account_verified));

    //tab 2 selected before
    store.dispatch(phishingDataSlice.actions.setSelectedBeforeTab2(
      data[0].is_tab_2_selected_before
    ));

    //checkpoint 8 done
    store.dispatch(phishingDataSlice.actions.setCheckpoint8Done(data[0].is_checkpoint8_done));

    //next email appear timing
    store.dispatch(phishingDataSlice.actions.setNextInboxAppearanceTiming(
      data[0].next_email_appear_timing
    ));

    //inbox selected
    store.dispatch(phishingDataSlice.actions.selectInbox(data[0].focusing_email_id));

    //bookmarked email ids
    store.dispatch(phishingDataSlice.actions.setBookmarkedContent(data[0].bookmarked_email_ids));

    //marked as read email ids
    store.dispatch(phishingDataSlice.actions.setMarkedAsReadContent(
      data[0].marked_as_read_email_ids
    ));

    //reported email ids
    store.dispatch(phishingDataSlice.actions.setReportPhishingList(
      data[0].reported_phish_email_ids
    ));

    //selected email ids
    store.dispatch(phishingDataSlice.actions.setSelectedBeforeInboxList(
      data[0].selected_email_ids
    ));
  }
}
