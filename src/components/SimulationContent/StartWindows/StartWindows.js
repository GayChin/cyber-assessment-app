import React from "react";
import styles from "./StartWindows.module.scss";
import PhishingStartWindow from "../Phishing/PhishingStartWindow";
import background from "../Phishing/src/PhishingStartBackground.png";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const StartWindows = ({type, startWithTimer, startWithoutTimer}) => {
  let startingWindow;
  const location = useLocation();

  const simulationName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const simulationCompletionStatus = useSelector(
    (state) => state.timer.simulationCompletionStatus[String(simulationName)]
  );
  
    if(simulationCompletionStatus){
      startingWindow = (
        <div>
          <div className={styles["start-window-container"]}>
            <img src={background} alt="Phishing Starting Screen" />
            <div className={styles["phishing-start-prompt"]}>Completed</div>
          </div>
        </div>
      )
    }else if(type === "phishing"){
      startingWindow = (
        <PhishingStartWindow
          startWithTimer={startWithTimer}
          startWithoutTimer={startWithoutTimer}
        />
      );
    }


  return (
    <div className={styles["start-windows-container"]}>{startingWindow}</div>
  );
};

export default StartWindows;
