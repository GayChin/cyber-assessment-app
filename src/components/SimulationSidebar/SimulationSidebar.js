import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GeneralButton} from "../GeneralButton/GeneralButton";
import styles from "./SimulationSidebar.module.scss";
import Topic from "./Topic";
import {
  setIncomingEmail,
  addEmail,
} from "../../redux/simulationData/phishingData/phishingDataSlice";
import {useHistory, useLocation, useParams} from "react-router-dom";
//api here
import {upsertSimulationRecord} from "../../services/api/simulationRecord";
import {upsertUserProfile} from "../../services/api/userProfile";
import {
  getModuleRecord,
  upsertModuleRecord,
} from "../../services/api/moduleRecord";
import {
  setIsTimerRunning,
  setSimulationCompletionStatus,
  setStarted,
} from "../../redux/timer/timerSlice";
import {
  setSimulations,
  setSimulationIsLoading,
  setSidebarIsLoading,
} from "../../redux/simulations/simulationsSlice";
import {setCurrentModule} from "../../redux/module/moduleSlice";
import {upsertSimulationPhishing} from "../../services/api/simulationPhishing";
import {store} from "../../redux/store";
import {fetchPhishingSimulation} from "../../services/simulation-fetcher/phishing";
import {setUserProfileData} from "../../redux/user/userSlice";
import {getIsModuleCompleted} from "../../services/api/moduleRecord";

const SimulationSidebar = () => {
  const {moduleId} = useParams();
  const history = useHistory();
  const location = useLocation();
  const isFirstRun = useRef(true);
  const simulationIsSet = useRef(false);
  const simulationList = useSelector(
    (state) => state.simulations.simulationList
  );

  const inboxArr = useSelector((state) => state.phishingData.inboxArr);
  const inboxTimer = useSelector((state) => state.timer.phishingRemainingTime);
  const userProfile = useSelector((state) => state.user.userProfile);
  const checkpoints = useSelector((state) => state.checkpoint.checkpoints);
  const dispatch = useDispatch();
  const inboxTimedArr = useSelector(
    (state) => state.phishingData.inboxTimedArr
  );
  const reportedPhishList = useSelector(
    (state) => state.phishingData.reportedPhishList
  );
  //note: added by 1 already below
  const email4 = inboxTimedArr.find((inbox) => inbox.email_id === 4);
  const email5 = inboxTimedArr.find((inbox) => inbox.email_id === 5);
  const email6 = inboxTimedArr.find((inbox) => inbox.email_id === 6);
  const [isTimeoutSet, setIsTimeoutSet] = useState(email5 ? true : false);
  const accountVerified = useSelector(
    (state) => state.phishingData.accountVerified
  );

  const checkpoint6 = useSelector(
    (state) => state.checkpoint.checkpoints.checkpoint6
  );
  const checkpoint8Done = useSelector(
    (state) => state.phishingData.checkpoint8Done
  );
  const nextInboxAppearanceTiming = useSelector(
    (state) => state.phishingData.nextInboxAppearanceTiming
  );

  const simulationName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const saveAndRedirect = () => {
    dispatch(setIsTimerRunning(false));
    history.push("/");
  };

  // const [isLoading, setIsLoading] = useState(false);
  const isSidebarLoading = useSelector(
    (state) => state.simulations.sidebarIsLoading
  );

  const submitAndRedirect = async () => {
    const currentSimName = location.pathname.split("/").reverse()[0];
    const newUserProfile = {...userProfile};

    //upsert simulation phishing data
    dispatch(setIsTimerRunning(false));

    dispatch(
      setSimulationCompletionStatus({
        simulationName: currentSimName,
        status: true,
      })
    );

    await upsert();

    const response = await getIsModuleCompleted(moduleId);
    if (response.is_completed) {
      //set user is first time to false if completed all simulations within the first module
      newUserProfile.is_first_time = false;
      dispatch(setUserProfileData(newUserProfile));
      await upsertUserProfile(newUserProfile);

      //then redirect user to dashboard to see result
      history.push("/dashboard");
    }
  };

  const upsert = async () => {
    console.log("Current path : ", location.pathname);
    dispatch(setIsTimerRunning(false));
    dispatch(setSimulationIsLoading(true));
    const simulationList = store.getState().simulations.simulationList;
    if (
      simulationList &&
      simulationList.length !== 0 &&
      simulationIsSet.current === true
    ) {
      const simulationId = simulationList.filter((simulation) => {
        return simulation.simulation_url === simulationName;
      })[0].simulation_id;
      console.log("Upserting for simulation????????", simulationId);
      // general upsert for all simulations
      await upsertModuleRecord();
      await upsertSimulationRecord(simulationId, simulationName, checkpoints);

      //upsert for specific simulation, can be created as single function page to import to use it
      if (simulationId === 1) {
        console.log("is simulation id === 1??");
        await upsertSimulationPhishing();
      }
    }
    dispatch(setSimulationIsLoading(false));
  };

  useEffect(() => {
    //fetch module record based on url name
    async function fetchSimulation() {
      // if is not first time we will fetch simulation according to module id
      if (!userProfile.is_first_time) {
        dispatch(setSidebarIsLoading(true));
        dispatch(setSimulationIsLoading(true));
        let moduleRecordData = await getModuleRecord(1);
        console.log("fetching.. simulation");
        if (moduleRecordData) {
          console.log("enter?");
          dispatch(setSimulations(moduleRecordData[0].simulation_statuses));
          dispatch(setCurrentModule(moduleRecordData[0].module_id));
          dispatch(setIsTimerRunning(moduleRecordData[0].is_timer_running));
          dispatch(setStarted(moduleRecordData[0].is_started));
          for (
            let i = 0;
            i < moduleRecordData[0].simulation_statuses.length;
            i++
          ) {
            dispatch(
              setSimulationCompletionStatus({
                simulationName:
                  moduleRecordData[0].simulation_statuses[i].simulation_url,
                status: moduleRecordData[0].simulation_statuses[i].is_completed,
              })
            );
          }
        }

        const simulationList = store.getState().simulations.simulationList;

        const simulationId = simulationList.filter((simulation) => {
          return simulation.simulation_url === simulationName;
        })[0].simulation_id;

        if (simulationList) {
          simulationIsSet.current = true;
          dispatch(setSidebarIsLoading(false));

          // dispatch(setSidebarIsLoading(false));
          console.log("simulation is set!!!!");
        }

        if (simulationId === 1) {
          await fetchPhishingSimulation();
        }

        // if (response) {
        //   dispatch(setSimulations(response));
        //   if (simulationList) {
        //     simulationIsSet.current = true;
        //     console.log("simulation is set!!!!");
        //   }
        // }
      } else {
        // If it's first time, the simulation list is already fetched from login prompt
        // So we set simulation is set current to true str8 away.
        //let response = await getModuleRecord(1);
        console.log("is first time!!");
        if (simulationList) {
          simulationIsSet.current = true;
          console.log("simulation is set!!!!");
        }
      }
    }

    if (isFirstRun.current) {
      fetchSimulation();
      isFirstRun.current = false;
    }
    return function cleanup() {
      // dispatch(setSimulationIsLoading(false));
      isFirstRun.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //note: upsert on refresh
  const onBeforeUnload = (ev) => {
    console.log("upsert on refresh...");
    dispatch(setSimulationIsLoading(true)); // !!!
    upsert();
    ev.returnValue = "";
  };

  useEffect(() => {
    // console.log("inbox Timer : ", inboxTimer);
    // console.log("next inbox Timer : ", nextInboxAppearanceTiming)
    // if (
    //   !email6 &&
    //   email5 &&
    //   ((inboxTimer && inboxTimer === nextInboxAppearanceTiming) ||
    //     (checkpoint8Done && reportedPhishList.indexOf(6) === -1))
    // )

    if (
      !email4 &&
      inboxTimer &&
      inboxTimer === nextInboxAppearanceTiming &&
      reportedPhishList.indexOf(4) === -1
    ) {
      //Need to add one last condition to check whether reportedPhishList contains id3
      dispatch(setIncomingEmail(true));
      console.log("debug : dispatching 4th email 111");
      const inbox3ToAppend = {
        ...inboxArr[3],
        received_time: Math.trunc(Date.now() / 1000),
      };
      dispatch(addEmail(inbox3ToAppend));
      setTimeout(() => {
        dispatch(setIncomingEmail(false));
      }, 2000);
      // if (reportedPhishList.includes(3)) {
      // }
    }

    //triggered 5th email when 4th email is reported
    //but then when the timeout is set the inboxTimedArr still havent container the reportedTemplate email
    if (
      !email5 &&
      !email4 &&
      checkpoint6 &&
      reportedPhishList.indexOf(5) === -1
    ) {
      if (!isTimeoutSet) {
        setIsTimeoutSet(true);
        setTimeout(() => {
          dispatch(setIncomingEmail(true));
          console.log("debug : dispatching 5th email when reported");
          const inbox4ToAppend = {
            ...inboxArr[4],
            received_time: Math.trunc(Date.now() / 1000),
          };
          dispatch(addEmail(inbox4ToAppend));
          setTimeout(() => {
            dispatch(setIncomingEmail(false));
          }, 2000);
        }, 5000);
      }
    }

    //triggered 5th email when next inbox time is reached or after clicking ok
    if (
      (!email5 &&
        email4 &&
        inboxTimer &&
        inboxTimer === nextInboxAppearanceTiming) ||
      (!email5 &&
        email4 &&
        accountVerified &&
        reportedPhishList.indexOf(5) === -1)
    ) {
      dispatch(setIncomingEmail(true));
      console.log("debug : dispatching 5th email");
      const inbox4ToAppend = {
        ...inboxArr[4],
        received_time: Math.trunc(Date.now() / 1000),
      };
      dispatch(addEmail(inbox4ToAppend));
      setTimeout(() => {
        dispatch(setIncomingEmail(false));
      }, 2000);
    }

    if (
      !email6 &&
      email5 &&
      ((inboxTimer && inboxTimer === nextInboxAppearanceTiming) ||
        (checkpoint8Done && reportedPhishList.indexOf(6) === -1))
    ) {
      dispatch(setIncomingEmail(true));
      console.log("debug : dispatching 6th email");
      const inbox5ToAppend = {
        ...inboxArr[5],
        received_time: Math.trunc(Date.now() / 1000),
      };
      dispatch(addEmail(inbox5ToAppend));
      setTimeout(() => {
        dispatch(setIncomingEmail(false));
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inboxTimer]);

  //note: upsert on route changed
  useEffect(() => {
    dispatch(setSimulationIsLoading(true)); // !!!
    // dispatch(setSimulationIsLoading(false)); // !!!
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      if (simulationIsSet.current) {
        console.log("upsert on route changed...", simulationList);
        upsert();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["sidebar-container"]}>
      {isSidebarLoading ? (
        <div className={styles["loader-div"]}>
          <div className={styles["loader"]}></div>
        </div>
      ) : (
        <div className={styles["topic-container"]}>
          {simulationList.map((simulation, index) => {
            return (
              <React.Fragment key={simulation.simulation_id}>
                <Topic
                  title={simulation.simulation_name}
                  simulationId={simulation.simulation_id}
                  sequence={index}
                  length={simulationList.length}
                  // remainingTime={topic.remainingTime}
                  // isSelected={topic.isSelected}
                  URL={simulation.simulation_url}
                />
              </React.Fragment>
            );
          })}
        </div>
      )}
      <div className={styles["simulation-btn-container"]}>
        <GeneralButton
          text="Submit"
          buttonStyle="btn-medium-state-blue"
          buttonSize="btn-small"
          onClick={() => submitAndRedirect()}
        />
        <GeneralButton
          text={`Save & Quit`}
          buttonStyle="btn-medium-state-blue"
          buttonSize="btn-small"
          onClick={saveAndRedirect}
        />
      </div>
    </div>
  );
};
export default SimulationSidebar;
