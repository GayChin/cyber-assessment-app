import { axiosInstance, axiosNonTokenInstance } from "../axiosInstance.js";
import { store } from "../../redux/store.js";

export const getModule = async (module_id) => {
  try {
    const result = await axiosNonTokenInstance.get(
      `/module${module_id ? `/?module_id=${module_id}` : ``}`
    );
    console.log("%cLIST MODULE SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cLIST MODULE ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const upsertModule = async (moduleDetails) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      "/module/",
      moduleDetails,
      // Below are the Json Object structure for moduleDetails
      // {
      //   module_id: 1,
      //   module_name: "Module 1",
      //   module_url: "module-1",
      //   simulation_ids: [1, 2, 3, 4],
      // },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cUPSERT MODULE SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cUPSERT MODULE ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

// Ideally, it should return a "success" string instead of the result.data
// Not required on the frontend ?
export const deleteModule = async (module_id) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(
      `/module/?module_id=${module_id}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cDELETE MODULE SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cDELETE MODULE ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};
