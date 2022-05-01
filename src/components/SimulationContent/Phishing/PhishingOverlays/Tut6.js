import React from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";
import {useSelector} from "react-redux";

const Tut6 = (props) => {
  const accountVerified = useSelector(
    (state) => state.phishingData.accountVerified
  );
  console.log("account Verified : ", accountVerified);
  return (
    <TutorialWindow
      position="center"
      noPrevious={true}
      type="phishing"
      title="Tutorial - Phishing Simulation"
      message={
        !accountVerified
          ? "This is a phishing email"
          : "You have been warned that this is a phishing email"
      }
      next={props.next}
      nextMsg="Ok"
      // previous={props.previous}
    />
  );
};

export default Tut6;
