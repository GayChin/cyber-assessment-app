import React from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";

const Tut3 = (props) => {
  return (
    <TutorialWindow
      position="right"
      type="phishing"
      title="Tutorial - Phishing Simulation"
      message="On the left side, we have a list of emails that you will need to check through later in the simulation."
      next={props.next}
      previous={props.previous}
      prevMsg="Previous"
      nextMsg="Next"
    />
  );
};

export default Tut3;
