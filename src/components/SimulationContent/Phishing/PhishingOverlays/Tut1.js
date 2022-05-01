import React from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";

// Back and forth button
const Tut1 = (props) => {
  return (
    <TutorialWindow
      position="center"
      noPrevious={true}
      type="phishing"
      title="Tutorial - Phishing Simulation"
      message={`This is your first day at work. You have just activated your email account. In your Inbox, you will see some important onboarding emails. Please spend a few minutes to go through the emails. \n You are required to finish a short simulation of your email inbox. We will brief you through the description for each of the buttons and sections.`}
      next={props.next}
      nextMsg="Next"
      // previous={props.previous}
    />
  );
};

export default Tut1;
