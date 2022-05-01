import React from "react";
import styles from "./Phishing.module.scss";
import TabBar from "./TabBar";
import {useDispatch, useSelector} from "react-redux";
import TabContent from "./TabContent";
import UrlBar from "./UrlBar";
import PhishingOverlay from "./PhishingOverlays/PhishingOverlay";
import Tut1 from "./PhishingOverlays/Tut1";
import Tut2 from "./PhishingOverlays/Tut2";
import Tut3 from "./PhishingOverlays/Tut3";
import Tut4 from "./PhishingOverlays/Tut4";
import Tut5 from "./PhishingOverlays/Tut5";
import Tut6 from "./PhishingOverlays/Tut6";
import Tut7 from "./PhishingOverlays/Tut7";
import Checkpoint2Reminder from "./PhishingOverlays/Checkpoint2Reminder";
import Checkpoint3Reminder from "./PhishingOverlays/Reminder2";
import FinishSimulation from "./PhishingOverlays/FinishSimulation";
import {GeneralButton} from "../../GeneralButton/GeneralButton";
import {setIsTimerRunning} from "../../../redux/timer/timerSlice";
import {useLocation} from "react-router-dom";
// Background
import background from "./src/PhishingStartBackground.png";
import {
  setHintsTimeout,
  setTutorialIdx,
  setDoneTutorial,
} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import Reminder from "./PhishingOverlays/Reminder";
import Reminder2 from "./PhishingOverlays/Reminder2";

// import { setSimulationIsLoading } from "../../../redux/simulations/simulationsSlice";

const Phishing = () => {
  const selectedTab = useSelector((state) => state.phishingData.tabSelected);
  const dispatch = useDispatch();
  const location = useLocation();
  const simulationName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const tutorials = [
    <Tut1 key="1" next="next" />,
    <Tut2 key="2" previous="previous" next="next" />,
    <Tut3 key="3" previous="previous" next="next" />,
    <Tut4 key="4" previous="previous" next="next" />,
    <Tut5 key="5" previous="previous" next="finalNext" />,
    <Tut6 key="6" next="setVerifiedFinalNext" />,
    <Tut7 key="7" previous="yes" next="no" />,
    <FinishSimulation key="8" next="submit" />,
    <Reminder key="9" next="rehint" />,
    <Reminder2 key="10" previous="addEmail" next="rehint" />,
  ];

  //Fetch from redux
  const tutorialIdx = useSelector((state) => state.phishingData.tutorialIdx);
  const isTutorialDone = useSelector(
    (state) => state.phishingData.doneTutorial
  );
  const simulationCompletionStatus = useSelector(
    (state) => state.timer.simulationCompletionStatus[String(simulationName)]
  );
  const isTimerRunning = useSelector((state) => state.timer.isTimerRunning);
  const simulationIsLoading = useSelector(
    (state) => state.simulations.simulationIsLoading
  );
  const timeoutId = useSelector((state) => state.phishingData.hintsTimeout);
  const markedAsReadList = useSelector(
    (state) => state.phishingData.markedAsReadList
  );

  function setHintsPrompt(tutorialKey) {
    //always clear timeout before creating a new one

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      dispatch(setHintsTimeout(null));
    }

    const hintTimeout = setTimeout(() => {
      console.log("FINAL NEXT PROMPT TEST!");
      if (markedAsReadList.length === 0) {
        //dispatch have you finished reading
      } else {
        //dispatch new emails coming
      }
      dispatch(setTutorialIdx(tutorialKey));
      dispatch(setDoneTutorial(false));
    }, 5000);

    dispatch(setHintsTimeout(hintTimeout));
  }

  function setTimerRunningAndHint() {
    dispatch(setIsTimerRunning(true));
    setHintsPrompt(8);
  }

  return (
    <>
      <div className={styles["phishing-container"]}>
        {!simulationIsLoading ? (
          //
          <>
            {isTutorialDone && !simulationCompletionStatus && !isTimerRunning && (
              <>
                <PhishingOverlay />{" "}
                <div className={styles["continue-prompt"]}>
                  <GeneralButton
                    text="Continue the simulation"
                    buttonSize="btn-extra-small"
                    buttonStyle="btn-plump-purple"
                    buttonRadius="btn-less-slightly-rounded"
                    onClick={() => {
                      setTimerRunningAndHint();
                    }}
                  />
                </div>
              </>
            )}
            {!simulationCompletionStatus ? (
              <>
                {isTutorialDone ? (
                  <div id="test-window" style={{display: "none"}}>
                    <PhishingOverlay />
                    {tutorials[tutorialIdx]}
                  </div>
                ) : (
                  <div id="test-window" style={{display: "block"}}>
                    <PhishingOverlay />
                    {tutorials[tutorialIdx]}
                  </div>
                )}

                <TabBar selectedTab={selectedTab} />
                <UrlBar selectedTab={selectedTab} />
                <TabContent selectedTab={selectedTab} />
              </>
            ) : (
              <div className={styles["start-window-container"]}>
                <img src={background} alt="Phishing Starting Screen" />
                <div className={styles["phishing-start-prompt"]}>Completed</div>
              </div>
            )}
          </>
        ) : (
          //
          <div className={styles["loader-div"]}>
            <div className={styles["loader"]}></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Phishing;
