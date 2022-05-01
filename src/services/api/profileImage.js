import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const getProfileImage = async (email) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(`/profilePicture/?email=${email}`, {
      headers: {
        Authorization: `JWT ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("%cLIST PROFILE IMAGE SUCCESS!!!!", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cLIST PROFILE IMAGE ERROR!!!!", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const upsertProfileImage = async (profilePicFormData) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      "/profilePicture/",
      profilePicFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cUPSERT PROFILE IMAGE SUCCESS!!!!", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cUPSERT PROFILE IMAGE ERROR!!!!", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const deleteProfileImage = async (email) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(
      `/profilePicture/?email=${email}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cDELETE PROFILE IMAGE SUCCESS!!!!", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cDELETE PROFILE IMAGE ERROR!!!!", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};
