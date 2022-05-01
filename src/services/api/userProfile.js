import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const getUserProfile = async (email) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(`/userProfile/?email=${email}`, {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    console.log("%cLIST USER PROFILE SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cLIST USER PROFILE ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const upsertUserProfile = async (userProfileDetails) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      "/userProfile/",
      userProfileDetails,
      // Below are the Json Object structure for userProfileDetails
      // {
      //   email: "testuser01@a.com",
      //   birth_date: "01-01-2001",
      //   first_name: "Test User",
      //   last_name: "01",
      //   gender: "Male",
      //   position: "",
      //   total_score: 0,
      // },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cUPSERT USER PROFILE SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cUPSERT USER PROFILE ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const deleteUserProfile = async (email) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(`/userProfile/?email=${email}`, {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.log("%cDELETE USER PROFILE ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};
