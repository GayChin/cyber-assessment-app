import {store} from "../redux/store.js";
import {phishingDataSlice} from "../redux/simulationData/phishingData/phishingDataSlice";

export const setHintsPrompt = async (tutorialKey) => {
  //always clear timeout before creating a new one
  const timeoutId = store.getState().phishingData.hintsTimeout;
  console.log("1 I'm in");

  if (timeoutId !== null) {
    console.log("2 Clear Time Out");
    clearTimeout(timeoutId);
  }

  const hintTimeout = setTimeout(() => {
    console.log("3 hint sent!");
    store.dispatch(phishingDataSlice.actions.setTutorialIdx(tutorialKey));
    store.dispatch(phishingDataSlice.actions.setDoneTutorial(false));
  }, 2000);

  console.log("4 ??", hintTimeout);
  store.dispatch(phishingDataSlice.actions.setHintsTimeout(hintTimeout));
};
