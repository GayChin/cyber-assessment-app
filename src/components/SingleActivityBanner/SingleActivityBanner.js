import React from "react";
import {useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import "./SingleActivityBanner.scss";
import {GeneralButton} from "../GeneralButton/GeneralButton";
import {store} from "../../redux/store";
import {setLoginPrompt} from "../../redux/general/generalSlice";
// import { getSimulationRecord } from "../../services/api/simulationRecord";
// import {getModuleRecord} from "../../services/api/moduleRecord";
// import {getSimulationPhishing} from "../../services/api/simulationPhishing";
// import {
//   setSidebarIsLoading,
//   setSimulationIsLoading,
//   setSimulations,
// } from "../../redux/simulations/simulationsSlice";
// import {setCurrentModule} from "../../redux/module/moduleSlice";
// import {
//   setIsTimerRunning,
//   setStarted,
//   setSimulationCompletionStatus,
// } from "../../redux/timer/timerSlice";

// props: parentMod, title, type, desc, duration, imgsrc,onclick
const SingleActivityBanner = ({activity, descId, buttonId}) => {
  const {moduleId} = useParams();

  // Either module record can handle no pass authorization header
  // We have a useEffect first, to determine whether the user login or not, if the user is login, then we call setModuleRecord
  const dispatch = useDispatch();
  const history = useHistory();
  const userLoggedOn = store.getState().user.userProfile.email;

  function capitalizeFirstLetter(str) {
    return "" + str[0].toUpperCase() + str.slice(1);
  }

  function durationFormatter(duration) {
    const num = duration;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    const hourString =
      rhours === 0 ? "" : rhours > 1 ? rhours + " hours " : rhours + " hour ";
    const minuteString =
      rminutes === 0
        ? ""
        : rminutes > 1
        ? rminutes + " minutes "
        : rminutes + " minute ";

    return hourString + minuteString;
  }

  async function fetchSimulation() {
    history.push(`/modules/${moduleId}/simulation/${activity.url}`);
  }

  return (
    <div
      className="SingleActivityBanner"
      style={{
        background: `linear-gradient(rgba(59, 58, 63, 0.7), rgba(59, 58, 63, 0.7)),
      url(https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29ya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="text">
        <div id={descId}>
          <p>
            {/* BACKEND TODO : parent module id */}
            {activity.modules?.map((item, index) => (
              <a
                key={index}
                href={`/modules/${item.module_id}`}
                style={{color: "white"}}
              >
                {item.module_name}
              </a>
            ))}
          </p>
          <p>{capitalizeFirstLetter(activity.type)}</p>
          <h1>{activity.name}</h1>
          <div className="desc">
            <p>{activity.description}</p>
          </div>
          <p>Length: {durationFormatter(activity.duration_length)}</p>
        </div>
        <div>
          {activity.status === "Completed" ? (
            <GeneralButton
              text="View Result"
              buttonSize="btn-small"
              id={buttonId}
              onClick={() => history.push("/dashboard")}
              clickable={buttonId ? false : true}
              // onClick={() => (window.location.href = '/dashboard')}
            />
          ) : (
            <>
              {userLoggedOn ? (
                <GeneralButton
                  text={activity.status}
                  buttonSize="btn-small"
                  id={buttonId}
                  onClick={() => fetchSimulation()}
                  clickable={buttonId ? false : true}
                />
              ) : (
                <GeneralButton
                  text="Sign In"
                  buttonSize="btn-small"
                  onClick={() => dispatch(setLoginPrompt(true))}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleActivityBanner;

//example:
/* <SingleActivityBanner parentMod="Module A" title="Activity A" type="Simulation"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Id consectetur purus ut faucibus pulvinar. Neque laoreet suspendisse interdum consectetur libero id. 
        Cras adipiscing enim eu turpis egestas pretium aenean. Ut tristique et egestas quis ipsum."
        duration="2 hours" imgsrc={SingleActivityPageImg} /> */
