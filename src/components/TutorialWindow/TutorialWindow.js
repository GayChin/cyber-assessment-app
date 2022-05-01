import React, {useEffect, useRef, useState} from "react";
import styles from "./TutorialWindow.module.scss";
import {GeneralButton} from "../GeneralButton/GeneralButton";
import {useSelector, useDispatch} from "react-redux";
import {
  setAccountVerified,
  setDoneTutorial,
  setTutorialIdx,
  setCheckpoint8Done,
} from "../../redux/simulationData/phishingData/phishingDataSlice";
import {setIsTimerRunning} from "../../redux/timer/timerSlice.js";
import {setCheckpoint} from "../../redux/checkpoint/checkpointSlice";
import {
  setDoingTutorial,
  setHintsTimeout,
  addEmail,
  setIncomingEmail,
  setLastReminder,
} from "../../redux/simulationData/phishingData/phishingDataSlice";
import {store} from "../../redux/store";

const TutorialWindow = ({
  type,
  index,
  position,
  title,
  message,
  next,
  nextMsg,
  prevMsg,
  previous,
  noPrevious,
  gotExtraButton,
}) => {
  const tutorialIdx = useSelector((state) => state.phishingData.tutorialIdx);
  const timeoutId = useSelector((state) => state.phishingData.hintsTimeout);
  const dispatch = useDispatch();
  const inboxArr = useSelector((state) => state.phishingData.inboxArr);
  const inboxTimedArr = useSelector(
    (state) => state.phishingData.inboxTimedArr
  );
  const markedAsReadList = useSelector(
    (state) => state.phishingData.markedAsReadList
  );
  const markedAsReadListLength = useRef(markedAsReadList.length);
  const inboxTimedArrLength = useRef(inboxTimedArr.length);
  // const [markedAsReadListLength, setMarkedAsReadListLength] = useState(markedAsReadList.length)
  // const [inboxTimedArrLength, setinboxTimedArrLength] = useState(inboxTimedArr.length)
  // next={next}
  // next = "next"
  // next = "finalNext"

  useEffect(() => {
    console.log("mark as read rerender");
    markedAsReadListLength.current = markedAsReadList.length;
    inboxTimedArrLength.current = inboxTimedArr.length;
    console.log("marked as read list length ", markedAsReadListLength.current);
    console.log("inbox timed array length ", inboxTimedArrLength.current);
  }, [markedAsReadList]);

  const nextFunc = () => {
    dispatch(setTutorialIdx(tutorialIdx + 1));
    return;
  };

  function setHintsPrompt() {
    //always clear timeout before creating a new one
    let hintTimeout;
    console.log("set hint prompt");
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      dispatch(setHintsTimeout(null));
    }

    // Dynamically set Tutorial
    hintTimeout = setTimeout(() => {
      dispatch(setTutorialIdx(8));
      dispatch(setDoneTutorial(false));
    }, 30000);

    dispatch(setHintsTimeout(hintTimeout));
  }

  const finalNextFunc = () => {
    console.log("final next");

    dispatch(setTutorialIdx(tutorialIdx + 1));
    dispatch(setIsTimerRunning(true));
    dispatch(setDoneTutorial(true));
    dispatch(setDoingTutorial(false));
    setHintsPrompt();

    // Submit an async request to backend to update that user has completed tutorial for phishing + update redux PhishingData store
    return;
  };

  const setVerifiedFinalNextFunc = () => {
    // useSelector
    console.log("index : ", index);
    if (type === "hint") {
      dispatch(setDoneTutorial(true));
      setHintsPrompt(index);
    } else {
      console.log("setVerified");
      dispatch(setDoneTutorial(true));
      dispatch(setAccountVerified(true));
    }
    return;
  };

  const previousFunc = () => {
    if (tutorialIdx > 0) {
      dispatch(setTutorialIdx(tutorialIdx - 1));
    }
    return;
  };

  const yesFunc = () => {
    // dispatch(setTutorialIdx(tutorialIdx + 1));
    dispatch(setCheckpoint({checkpointName: "checkpoint7", status: true}));
    dispatch(setDoneTutorial(true));
    dispatch(setCheckpoint8Done(true));

    return;
  };

  const noFunc = () => {
    // dispatch(setTutorialIdx(tutorialIdx + 1));
    dispatch(setDoneTutorial(true));
    dispatch(setCheckpoint8Done(true));
    return;
  };

  const anotherLook = () => {
    dispatch(setDoneTutorial(true));
  };

  const submitSimulation = () => {
    console.log("submit simulation");
    clearTimeout(timeoutId);
    dispatch(setHintsTimeout(null));
    dispatch(setDoneTutorial(true));
    dispatch(setLastReminder(true));
  };

  const renderNextEmail = () => {
    console.log("render next email");
    // Getting the next email id then render the next email
    const nextInboxId = inboxTimedArr.length;

    if (nextInboxId > 5) {
      return;
    }

    const inboxToAppend = {
      ...inboxArr[nextInboxId],
      received_time: Math.trunc(Date.now() / 1000),
    };
    dispatch(setDoneTutorial(true));
    setTimeout(() => {
      dispatch(setIncomingEmail(true));
      dispatch(addEmail(inboxToAppend));

      setHintsPrompt();

      setTimeout(() => {
        dispatch(setIncomingEmail(false));
      }, 1500);
    }, 1500);
  };

  const rehint = () => {
    console.log("rehint");
    dispatch(setDoneTutorial(true));
    setHintsPrompt();
  };

  let paragraphs;
  try {
    paragraphs = message
      .split("\n")
      .map((string, index) => <p key={index}>{string}</p>);
  } catch (e) {
    paragraphs = message;
  }

  return (
    <div className={`${styles["tutorial-window"]} ${styles[position]}`}>
      <div
        className={
          type === "phishing"
            ? styles["phishing-tutorial-title"]
            : styles["tutorial-title"]
        }
      >
        {title}
      </div>
      <div className={styles["message-container"]}>
        <div>{paragraphs}</div>
        <div className={styles["tutorial-window-buttons-container"]}>
          {noPrevious === false ? (
            <GeneralButton
              text={prevMsg}
              buttonSize="btn-extra-small"
              buttonStyle="btn-plump-purple"
              buttonRadius="btn-less-slightly-rounded"
              onClick={
                previous === "previous"
                  ? previousFunc
                  : "addEmail"
                  ? renderNextEmail
                  : yesFunc
              }
            />
          ) : (
            <></>
          )}
          <GeneralButton
            text={nextMsg}
            buttonSize="btn-extra-small"
            buttonStyle="btn-plump-purple"
            buttonRadius="btn-less-slightly-rounded"
            onClick={
              next === "setVerifiedFinalNext"
                ? setVerifiedFinalNextFunc
                : next === "no"
                ? noFunc
                : next === "next"
                ? nextFunc
                : next === "finalNext"
                ? finalNextFunc
                : next === "rehint"
                ? rehint
                : submitSimulation
            }
          />
          {gotExtraButton ? (
            <GeneralButton
              text="Let me refer back"
              buttonSize="btn-extra-small"
              buttonStyle="btn-plump-purple"
              buttonRadius="btn-less-slightly-rounded"
              onClick={anotherLook}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

TutorialWindow.defaultProps = {
  noPrevious: false,
  gotExtraButton: false,
};

export default TutorialWindow;
