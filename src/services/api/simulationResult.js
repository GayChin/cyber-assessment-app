import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const getSimulationResult = async (simulation_id) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(
      `/simulationResult/?simulation_id=${simulation_id}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cGET SIMULATION RESULT SUCCESS *********", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cGET SIMULATION RESULT ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};
