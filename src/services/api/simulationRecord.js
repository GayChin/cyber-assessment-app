import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const getSimulationRecord = async (simulation_id) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(
      `/simulationRecord/?simulation_id=${simulation_id}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    if (result) {
      // console.log("IS THIS AN ARRYA", result.data);
    }
    return result.data;
  } catch (err) {
    console.log("%cLIST SIMULATION RECORD ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const upsertSimulationRecord = async (
  simulationId,
  simulationName,
  checkpoints
) => {
  console.log("upsertin..", store.getState().timer.phishingRemainingTime);
  const payload = {
    is_completed:
      store.getState().timer.simulationCompletionStatus[String(simulationName)],
    remaining_time: store.getState().timer.phishingRemainingTime,
    ...checkpoints,
    simulation_id: simulationId,
  };

  console.log("payload ... ", payload);
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post("/simulationRecord/", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${access_token}`,
      },
    });
    console.log("%cUPSERT SIMULATION RECORD SUCCESS!!!!", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cUPSERT SIMULATION RECORD ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const deleteSimulationRecord = async (simulation_id) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(
      `/simulationRecord/`,
      {
        email: store.getState().user.userProfile.email,
        simulation_id: simulation_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cDELETE SIMULATION RECORD SUCCESS!!!!", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cDELETE SIMULATION RECORD ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};
