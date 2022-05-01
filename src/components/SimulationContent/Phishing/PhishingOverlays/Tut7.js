import React from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";
import {useSelector} from "react-redux";

const Tut7 = (props) => {
  const accountVerified = useSelector(
    (state) => state.phishingData.accountVerified
  );
  console.log("account Verified : ", accountVerified);
  return (
    <TutorialWindow
      position="center"
      type="phishing"
      title="Tutorial - Phishing Simulation"
      message="Is this email a phishing email?"
      previous={props.previous}
      gotExtraButton={true}
      next={props.next}
      prevMsg="Yes"
      nextMsg="No"
    />
  );
};

export default Tut7;
