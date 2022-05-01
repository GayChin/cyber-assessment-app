import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

//  ---------------------------------- Admin APIs Start ----------------------------------
export const createAccount = async (accountDetails) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      "/account/",
      accountDetails,
      // Below are the Json Object structure for accountDetails
      // {
      //   first_name: "Test User",
      //   last_name: "01",
      //   gender: "Male",
      //   position: "",
      //   password: "testuser001",
      //   email: "testuser01@a.com",
      //   is_admin: false,
      //   is_staff: false,
      //   is_manager: false,
      //   is_employee: true,
      //   is_first_time: true,
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
    console.log("%cCREATE ACCOUNT ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const getAccount = async (email) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(`/account/?email=${email}`, {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.log("%cLIST ACCOUNT ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const updateAccount = async (accountDetails) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.put(
      `/account/`,
      accountDetails,
      // Below are the Json Object structure for accountDetails
      // {
      //   email: "testuser01@a.com",
      //   is_admin: true,
      //   is_staff: true,
      //   is_manager: true,
      //   is_employee: true,
      //   is_first_time: false,
      // },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cUPDATE ACCOUNT SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cUPDATE ACCOUNT ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const deleteAccount = async (email) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(`/account/?email=${email}`, {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    console.log("%cDELETE ACCOUNT SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cDELETE ACCOUNT ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};
//  ----------------------------------- Admin APIs End -----------------------------------

//  ----------------------------------- User APIs Start -----------------------------------
export const changePassword = async (changePasswordDetails) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.put(
      `/changePassword/`,
      changePasswordDetails,
      // Below are the Json Object structure for changePasswordDetails
      // {
      //   email: "testuser01@a.com",
      //   password: "testuser001",
      //   password2: "testuser001",
      //   old_password: "testuser002",
      // },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cCHANGE PASSWORD SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cCHANGE PASSWORD ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
    return err.response;
  }
};
//  ------------------------------------ User APIs End ------------------------------------
