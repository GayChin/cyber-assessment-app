import React from "react";
import {useEffect} from "react";
import Phishing from "./Phishing/Phishing";
import styles from "./SimulationContent.module.scss";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import background from "./Phishing/src/PhishingStartBackground.png";

const SimulationContent = ({type}) => {
  const location = useLocation();
  const simulationName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const simulationCompletionStatus = useSelector(
    (state) => state.timer.simulationCompletionStatus[String(simulationName)]
  );

  const simulationIsLoading = useSelector(
    (state) => state.simulations.simulationIsLoading
  );

  let sample;

  if (simulationCompletionStatus === true) {
    sample = (
      <div>
        <div className={styles["start-window-container"]}>
          <img src={background} alt="Phishing Starting Screen" />
          <div className={styles["phishing-start-prompt"]}>Completed</div>
        </div>
      </div>
    );
  } else if (type === "phishing") {
    sample = <Phishing />;
  } else {
    sample = <div>Not implemented yet</div>;
  }

  // var remainingTime;
  const remainingTime = useSelector(
    (state) => state.timer.phishingRemainingTime
  );

  // useEffect(() => {
  //   // console.log("%c???????????????????" + remainingTime, "color: #FF0000");
  // }, [remainingTime]);

  return (
    <>
      {/* if timer is not int */}
      {simulationIsLoading ? (
        <div className={styles["simulation-content-container"]}>
          <div className={styles["loader-div"]}>
            <div className={styles["loader"]}></div>
          </div>
        </div>
      ) : (
        <div className={styles["simulation-content-container"]}>{sample} </div>
      )}
    </>
  );
};

export default SimulationContent;
