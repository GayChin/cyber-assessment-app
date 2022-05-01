import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const getModuleRecord = async (module_id) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(
      `/moduleRecord/${module_id ? `?module_id=${module_id}` : ""}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log("%cLIST MODULE RECORD ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const upsertModuleRecord = async () => {
  const moduleRecordDetails = {
    module_id: store.getState().module.currentModule,
    focusing_simulation_id: 1,
    is_started: store.getState().timer.started,
    is_timer_running: false,
  };

  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      `/moduleRecord/`,
      moduleRecordDetails,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cUPSERT MODULE RECORD SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cUPSERT MODULE RECORD ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

// *** Ingore in API documentation ***
// export const updateModuleRecord = async (moduleRecordDetails) => {
//   try {
//     const access_token = store.getState().user.user.access_token;
//     const result = await axiosInstance.put(
//       "/moduleRecord/",
//       moduleRecordDetails,
//       // Below are the Json Object structure for moduleRecordDetails
//       // {
//       //   simulation_id: 4,
//       //   name: "Simulation 5",
//       //   url: "sim5",
//       // },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${access_token}`,
//         },
//       }
//     );
//     return result.data;
//   } catch (err) {
//     console.log(
//       "%cUPDATE MODULE RECORD ERROR *********", "color: #FF0000"
//     );
//     console.log(JSON.stringify(err.message));
//   }
// };

export const deleteModuleRecord = async (module_id) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(
      `/moduleRecord/?module_id=${module_id}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cDELETE MODULE RECORD SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cDELETE MODULE RECORD ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const getIsModuleCompleted = async (module_id) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(
      `/isModuleCompleted/?module_id=${module_id}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%GET IS MODULE COMPLETED SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%GET IS MODULE COMPLETED ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
}
