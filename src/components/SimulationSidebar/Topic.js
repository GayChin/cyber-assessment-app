import React, { useEffect, useRef } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./Topic.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getSimulationRecord } from "../../services/api/simulationRecord";
import Timer from "../Timer/Timer";
import { setSimulationIsLoading } from "../../redux/simulations/simulationsSlice";
// import {setTimer} from "../../redux/timer/timerSlice";
// import { getSimulation } from "../../services/api/simulation";

const Topic = ({ title, URL, simulationId, sequence, length }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {moduleId} = useParams();
  let isRunning = useSelector((state) => state.timer.isTimerRunning);

  const simulationRecord = useRef({});
  //const [simulationRecord, aaa] = useState({});
  // const simulationRecord = useSelector((state) => state.simulations.simulationRecord)
  const simulationCompletionStatus = useSelector(
    // For some reason, this one doesn't get updated even when Timer calls backend, need to investigate further later
    (state) => state.timer.simulationCompletionStatus
  );
  //  let lastId;

  const setSimulationRecord = (payload) =>
    new Promise((resolve, reject) => {
      simulationRecord.current = payload;
      console.log(simulationRecord.current);
      resolve();
    });

  useEffect(() => {
    const simulationName = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );

    async function fetchSimulationRecord() {
      console.log("rerender");
      dispatch(setSimulationIsLoading(true));
      let response = await getSimulationRecord(simulationId);
      if (response) {
        simulationRecord.current = response[0];
        await setSimulationRecord(response[0]);
        dispatch(setSimulationIsLoading(false));
      }
    }
    // async function fetchModuleRecord(){
    // }
    if (simulationName === URL) {
      fetchSimulationRecord();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulationRecord]);

  // useEffect(() => {
  // if (simulationRecord.simulation_id === 1) {
  //   console.log("set time from topic");
  //   dispatch(
  //     setTimer({
  //       simulationRemainingTime: "phishingRemainingTime",
  //       timeRemaining: simulationRecord.remaining_time,
  //     })
  //   );
  // }

  // if(simulationRecord && simulationRecord.simulation_id === lastId){
  //   dispatch(setSimulationIsLoading(false));
  // }
  // dispatch(setSimulationIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [simulationRecord]);

  return (
    <div className={styles["topic"]}>
      <Link to={{ pathname: `/modules/${moduleId}/simulation/${URL}` }}>
        <div
          className={
            location.pathname.includes(URL)
              ? styles["selected-topic"]
              : styles["topic"]
          }
        >
          {title}
          {!!location.pathname.includes(URL) &&
          !simulationRecord.current.is_completed &&
          isRunning ? (
            <span className={styles["timer-style"]}>
              <Timer
                url={URL}
                isCompleted={simulationRecord.current.is_completed}
                remainingTime={simulationRecord.current.remaining_time}
              />
            </span>
          ) : simulationRecord.current.is_completed ? (
            <FaCheckCircle className={styles["check-circle"]} />
          ) : simulationCompletionStatus[URL] ? (
            <FaCheckCircle className={styles["check-circle"]} />
          ) : (
            <div></div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Topic;
