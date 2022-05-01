import React from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";

const FinishSimulation = (props) => {
  return (
    <TutorialWindow
      position="center"
      type="phishing"
      title="Reminder - Phishing Simulation"
      message="You have reached the last checkpoint of the simulation, click the submit button if you think you have done the simulation correctly."
      noPrevious={true}
      next={props.next}
      nextMsg="Ok"
    />
  );
};

export default FinishSimulation;
