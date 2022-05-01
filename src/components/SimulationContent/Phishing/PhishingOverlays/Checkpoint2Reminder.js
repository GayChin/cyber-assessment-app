import React from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";
import {useSelector} from "react-redux";

const Checkpoint2Reminder = (props) => {
  const accountVerified = useSelector(
    (state) => state.phishingData.accountVerified
  );
  console.log("account Verified : ", accountVerified);
  return (
    <TutorialWindow
      position="center"
      index = {props.index}
      noPrevious={true}
      type="hint"
      title="Tutorial - Phishing Simulation"
      message={'Checkpoint 2 reminder'}
      next={props.next}
      nextMsg="Ok"
      // previous={props.previous}
    />
  );
};

export default Checkpoint2Reminder;