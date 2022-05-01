import {axiosInstance, axiosNonTokenInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";


export const getSimulation = async (simulationId) => {
  const access_token = store.getState().user.user;
  try {
    let result;
    if(access_token){
      console.log("ada at")
       result = await axiosInstance.get(
        `/simulation/${simulationId ? `?simulation_id=${simulationId}` : ""}`,
        {
          headers: {
            Authorization: `JWT ${access_token}`,
          },
        }
      );
    }else{
      console.log("tak ada at")
      result = await axiosNonTokenInstance.get(
        `/simulation/${simulationId ? `?simulation_id=${simulationId}` : ""}`
      );
    }
    return result.data;
  } catch (err) {
    console.log("%cLIST SIMULATION ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const upsertSimulation = async (simulationDetails) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      "/simulation/",
      simulationDetails,
      // Below are the Json Object structure for simulationDetails
      // {
      //   name: "Simulation 5",
      //   url: "sim5",
      // },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log("%cUPSERT SIMULATION ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

// *** Ingore in API documentation ***
// export const updateSimulation = async (simulation_id) => {
//   try {
//     const access_token = store.getState().user.user.access_token;
//     const result = await axiosInstance.put(
//       "/simulation/",
//       {
//         simulation_id: simulation_id,
//         name: "Simulation 5",
//         url: "sim5",
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${access_token}`,
//         }
//       }
//     );
//     return result.data;
//   } catch (err) {
//     console.log("%cUPDATE SIMULATION ERROR *********", "color: #FF0000");
//     console.log(JSON.stringify(err.message));
//   }
// };

export const deleteSimulation = async (simulation_id) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(
      `/simulation/?simulation_id=${simulation_id}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log("%cDELETE SIMULATION ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};
