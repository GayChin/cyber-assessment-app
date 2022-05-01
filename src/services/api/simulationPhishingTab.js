import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const getSimulationPhishingTab = async () => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(`/simPhishingTab/`, {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.log(
      "%cLIST SIMULATION PHISHING TAB ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};

export const bulkUpsertSimulationPhishingTab = async () => {
  try {
    const access_token = store.getState().user.user.access_token;
    const simPhishingTabDetails = store.getState().phishingData.tabArr;
    console.log(simPhishingTabDetails);
    const result = await axiosInstance.post(
      `/simPhishingTab/`,
      simPhishingTabDetails,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(
      "%cBULK UPSERT SIMULATION PHISHING TAB ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};

export const bulkOverwriteSimulationPhishingTab = async () => {
  try {
    const access_token = store.getState().user.user.access_token;
    const simPhishingTabDetails = store.getState().phishingData.tabArr;
    const result = await axiosInstance.put(
      `/simPhishingTab/`,
      simPhishingTabDetails,
      // Below are the Json Object structure for simPhishingTabDetails
      // [
      //   {
      //     tab_id: 1,
      //     tab_name: "Out1ook",
      //     order: 0,
      //   },
      //   {
      //     tab_id: 2,
      //     tab_name: "Tab2",
      //     order: 1,
      //   },
      //   {
      //     tab_id: 3,
      //     tab_name: "Tab3",
      //     order: 2,
      //   },
      // ],
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(
      "%cBULK OVERWRITE SIMULATION PHISHING TAB ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};

export const deleteSimulationPhishingTab = async () => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(`/simPhishingTab/`, {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.log(
      "%cDELETE SIMULATION PHISHING TAB ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};
