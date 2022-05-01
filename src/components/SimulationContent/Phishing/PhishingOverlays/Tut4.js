import React from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";

const Tut4 = (props) => {
  return (
    <TutorialWindow
      position="more-left-down"
      type="phishing"
      title="Tutorial - Phishing Simulation"
      message="On the right hand side, you can see the content of each email, make sure you go through each of them thoroughly and take necessary actions if needed."
      next={props.next}
      previous={props.previous}
      prevMsg="Previous"
      nextMsg="Next"
    />
  );
};

export default Tut4;
