import { axiosInstance, axiosNonTokenInstance } from "../axiosInstance.js";
import { useDispatch } from "react-redux";
import { updateAccessToken } from "../../redux/user/userSlice.js";
import { store } from "../../redux/store.js";

export const login = async (credentials) => {
  try {
    const result = await axiosNonTokenInstance.post(
      "/auth/login/",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("%cLOGIN SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cLOGIN ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
    // if (err.response.status === 401) {
    //   console.log(JSON.stringify(err));
    // }
    // if (err.response.status === 400) {
    //   console.log("Display wrong password");
    // }
  }
};

export const adminLogin = async (credentials) => {
  try {
    const result = await axiosNonTokenInstance.post(
      "/auth/login/",
      credentials,
      // Below are the Json Object structure for credentials
      // {
      //   email: "admin@a.com",
      //   password: "admin"
      // },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("%cADMIN LOGIN SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cADMIN LOGIN ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

// Whenever we submit a Fetch request to backend, we need to attach our ACCESS TOKEN
// If the request returns to us a status code of 401
// We need to call a DIFFERENT API which will generate a NEW access token for us
// in the different API, we need to attach our REFRESH TOKEN ONLY
// The different API will return a NEW ACCESS TOKEN
// If the refresh token is invalid,
// The API request will fail,
// In that case, we logout
// We need to replace our old access token with the NEW ONE
// THEN, we submit our first FETCH request again from step 1

export const logout = async (userRefreshToken) => {
  try {
    await axiosInstance.post(
      "/auth/logout/",
      JSON.stringify({
        refresh_token: userRefreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("%cLOGOUT SUCCESS !!!! ", "color: #2AC54D");
  } catch (err) {
    console.log("%cLOGOUT ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const refreshAccessToken = async (userRefreshToken) => {
  await axiosInstance
    .post(
      "/auth/refreshAccessToken/",
      JSON.stringify({
        refresh_token: userRefreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      //Save the refresh token here
      console.log("%cREFRESH ACCESS TOKEN SUCCESS !!!! ", "color: #2AC54D");

      useDispatch(updateAccessToken(response));
      // try with store
      // store.getState().user.access_token = response;
    })
    .catch((error) => {
      const refreshToken = store.getState().user.user.refresh_token;
      console.log("%cREFRESH ACCESS TOKEN ERROR !!!! ", "color: #FF0000");
      //if access token and refresh token both expired redirect to login page
      if (error.response.status === 401 && refreshToken) {
      }
      //Delete both access and refresh tokens here
      return Promise.reject(error.message);
    });
};

export const checkJWTAuthentication = async () => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get("/auth/checkAuth/", {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    console.log("%cCHECK JWT AUTH SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cCHECK JWT AUTH ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};
