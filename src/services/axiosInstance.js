import axios from "axios";
import { store } from "../redux/store";
import { refreshAccessToken } from "./api/auth";
const applyMiddleware = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const accessToken = store.getState().user.user.access_token;
      config.headers.Authorization = `JWT ${accessToken}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const interceptor401 = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const accessToken = store.getState().user.user.access_token;
      //when have access token but expired
      if (error.response.status === 401 && accessToken) {
        //To avoid calling the interceptor again while refreshAccessToken is handling error
        axiosInstance.interceptors.response.eject(interceptor401);
        await refreshAccessToken(
          store.getState().user.user.refresh_token
        ).finally(axiosInstance.interceptors.response.use(interceptor401));
      } else {
        return Promise.reject(error);
      }
    }
  );
};

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export const axiosNonTokenInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

applyMiddleware(axiosInstance);
