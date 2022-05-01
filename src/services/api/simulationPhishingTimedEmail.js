import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const getSimulationPhishingTimedEmail = async () => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(`/simPhishingTimedEmail/`, {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.log(
      "%cLIST SIMULATION PHISHING TIMED EMAIL ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};

export const bulkOverwriteSimulationPhishingTimedEmail = async (
  simPhishingTimedEmailDetails
) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      `/simPhishingTimedEmail/`,
      simPhishingTimedEmailDetails,
      // Below are the Json Object structure for simPhishingTimedEmailDetails
      //   [
      //     {
      //         "email_id": 1,
      //         "received_time": "Wed 12:03PM"
      //     },
      //     {
      //         "email_id": 2,
      //         "received_time": "Wed 12:45PM"
      //     },
      //     {
      //         "email_id": 3,
      //         "received_time": "Thu 12:03PM"
      //     },
      //     {
      //         "email_id": 4,
      //         "received_time": "Thu 12:08PM"
      //     },
      //     {
      //         "email_id": 5,
      //         "received_time": "Fri 12:08PM"
      //     },
      //     {
      //         "email_id": 6,
      //         "received_time": "Fri 12:10PM"
      //     }
      // ]
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
      "%cBULK OVERWRITE SIMULATION PHISHING TIMED EMAIL ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};

// *** Ingore in API documentation ***
// export const updateSimulationPhishingTimedEmail = async (simPhishingTimedEmailDetails) => {
//   try {
//     const access_token = store.getState().user.user.access_token;
//     const result = await axiosInstance.put(
//       "/simPhishingTimedEmail/",
//       simPhishingTimedEmailDetails,
//       // Below are the Json Object structure for simPhishingTimedEmailDetails
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
//       "%cUPDATE SIMULATION PHISHING TIMED EMAIL ERROR *********",
//       "color: #FF0000"
//     );
//     console.log(JSON.stringify(err.message));
//   }
// };

export const deleteSimulationPhishingTimedEmail = async (email_id) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(
      `/simPhishingTimedEmail/?email_id=${email_id}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(
      "%cDELETE SIMULATION PHISHING TIMED ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};
