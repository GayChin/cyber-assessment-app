import React from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";
import {useSelector} from "react-redux";

const Reminder2 = (props) => {
  const accountVerified = useSelector(
    (state) => state.phishingData.accountVerified
  );
  console.log("account Verified : ", accountVerified);
  return (
    <TutorialWindow
      position="center"
      index = {props.index}
      type="hint"
      title="Reminder - Phishing Simulation"
      message={'Did you finish reading the email?'}
      previous={props.previous}
      next={props.next}
      prevMsg="Yes"
      nextMsg="No"
    />
  );
};

export default Reminder2;