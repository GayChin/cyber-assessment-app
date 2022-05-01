import React from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./Timer.module.scss";
import {
  setTimer,
  setIsTimerRunning,
  setSimulationCompletionStatus,
} from "../../redux/timer/timerSlice";

const Timer = ({ url, isCompleted, remainingTime }) => {
  // https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/
  // https://stackoverflow.com/questions/40885923/countdown-timer-in-react
  // Retrieve seconds left for this user from backend (obtained from useEffect)
  // Set the seconds variable with the data from backend
  // Use setInterval to reduce the seconds by every 1000 ms
  // Use modulus to calculate minutes
  const dispatch = useDispatch();

  const started = useSelector((state) => state.timer.started);
  const simulationCompletionStatus = useSelector(
    // For some reason, this one doesn't get updated even when Timer calls backend, need to investigate further later
    (state) => state.timer.simulationCompletionStatus
  );
  //Retrieve the seconds remaing from backend here, then set this value to redux, then pass the time remaining to the ref.current

  //TODO: We fetch remaining time from backend, when we click start, we will use that value, but once started
  // redux seconds will be used instead because we want to have persisted seconds

  let seconds = useRef(remainingTime);
  // console.log("use ref seconds : ", seconds);
  let displaySeconds = useRef(remainingTime % 60);
  let displayMinutes = useRef(Math.floor(remainingTime / 60));
  
  useEffect(() => {
    let interval = null;
    if (started === true) {
      interval = setInterval(() => {
        displaySeconds.current = seconds.current % 60;
        dispatch(
          setTimer({
            simulationRemainingTime: "phishingRemainingTime",
            timeRemaining: seconds.current,
          })
        );
        seconds.current -= 1;
        displayMinutes.current = Math.floor(seconds.current / 60);
        if (seconds.current === -1) {
          clearInterval(interval);
          dispatch(setIsTimerRunning(false));
          dispatch(
            setTimer({
              simulationRemainingTime: "phishingRemainingTime",
              timeRemaining: seconds.current,
            })
          );
          dispatch(
            setSimulationCompletionStatus({
              simulationName: url,
              status: true,
            })
          );
        }
      }, 1000);
    }

    return function cleanup() {
      dispatch(setIsTimerRunning(false));
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        isCompleted || simulationCompletionStatus[url] ? (
          <FaCheckCircle className={styles["check-circle"]} />
        ) : started ? (
          <span>
            {displayMinutes.current > 9
              ? "" + displayMinutes.current
              : "0" + displayMinutes.current}
            :
            {displaySeconds.current > 9
              ? "" + displaySeconds.current
              : "0" + displaySeconds.current}
          </span>
        ) : null
        // <span>
        //   {displayMinutes.current > 9
        //     ? "" + displayMinutes.current
        //     : "0" + displayMinutes.current}
        //   :
        //   {displaySeconds.current > 9
        //     ? "" + displaySeconds.current
        //     : "0" + displaySeconds.current}
        // </span>
      }
    </>
  );
};

// Step 1: Within Timerslice, I need a state to store the last topic that was chosen
// Step 2: onClick a new topic will run a reducer in timerSlice that will stop the timer & send the data to backend

// We add a state in Timerslice ( a boolean ) which will tell us whether the timer is running
// If timer is running when we change pages, we will run step 2,
// Otherwise, nothing needs to be done

// send the identifier (simulation) + remaining time to backend

export default Timer;
