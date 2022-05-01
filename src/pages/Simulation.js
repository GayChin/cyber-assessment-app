import React from "react";
import {useLocation} from "react-router-dom";
import SimulationSidebar from "../components/SimulationSidebar/SimulationSidebar";
import {useDispatch, useSelector} from "react-redux";
import {
  setLatestTopic,
  setIsTimerRunning,
  setStarted,
} from "../redux/timer/timerSlice";

import styles from "./Simulation.module.scss";
import SimulationContent from "../components/SimulationContent/SimulationContent";
import StartWindows from "../components/SimulationContent/StartWindows/StartWindows";

const Simulation = ({type}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  let isRunning = useSelector((state) => state.timer.isTimerRunning);
  let latestTopic = useSelector((state) => state.timer.latestTopic);
  let started = useSelector((state) => state.timer.started);
  const simulationIsLoading = useSelector(
    (state) => state.simulations.simulationIsLoading
  );

  const StartWithTimer = () => {
    const topic = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    dispatch(setLatestTopic(topic));
    dispatch(setIsTimerRunning(true));
    //console.log("Simulation is started");
  };

  const StartWithoutTimer = () => {
    dispatch(setStarted(true));
    const topic = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    dispatch(setLatestTopic(topic));
    console.log("Simulation is started");
  };

  console.log("Running: ", isRunning, " & Topic: ", latestTopic);

  return (
    <div className={styles["simulation-container"]}>
      <SimulationSidebar />
      {!simulationIsLoading ? (
        <>
          {started ? (
            <SimulationContent type={type} />
          ) : (
            <StartWindows
              type={type}
              startWithTimer={StartWithTimer}
              startWithoutTimer={StartWithoutTimer}
            />
          )}
        </>
      ) : (
        <div className={styles["loader-div"]}>
          <div className={styles["loader"]}></div>
        </div>
      )}
    </div>
  );
};

export default Simulation;
