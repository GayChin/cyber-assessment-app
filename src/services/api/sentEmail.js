import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const sendEmail = async (emailDetails) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      "/testSendEmail/",
      emailDetails,
      // Below are the Json Object structure for emailDetails
      // {
      //   name: "Ok",
      //   email: "tingweijingting2000@gmail.com",
      //   subject: "testing"
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
    console.log("%cSEND EMAIL ERROR *********", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};
