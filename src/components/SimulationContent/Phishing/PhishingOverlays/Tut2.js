import React from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";

const Tut2 = (props) => {
  return (
    <TutorialWindow
      position="right"
      type="phishing"
      title="Tutorial - Phishing Simulation"
      message="When the simulation is open, you can use the tabs on the left to check your latest incoming emails."
      next={props.next}
      previous={props.previous}
      prevMsg="Previous"
      nextMsg="Next"
    />
  );
};

export default Tut2;
