import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const createBehaviouralGap = async (behaviouralGapDetails) => {
  // ignore in postman
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      "/behaviouralGap/",
      behaviouralGapDetails,
      // Below are the Json Object structure for behaviouralGapDetails
      // {
      //   simulation_id: simulation_id, // Example Value : 2
      //   number: number, // Example Value : 1
      //   description: description, // Example Value : "Sim A"
      // },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cCREATE BEHAVIOURAL GAP SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cCREATE BEHAVIOURAL GAP ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const listBehaviouralGap = async (simulation_id) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(
      `/behaviouralGap/?simulation_id=${simulation_id}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cLIST BEHAVIOURAL GAP SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cLIST BEHAVIOURAL GAP ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const bulkUpsertBehaviouralGap = async (behaviouralGapDetails) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      "/behaviouralGap/",
      behaviouralGapDetails,
      // Below are the Json Object structure for behaviouralGapDetails
      //   [ an array of objects
      //     {
      //         "number": 1,
      //         "beh_gap_title": "Email phishing",
      //         "beh_gap_desc": "Also called “deception phishing”, email phishing is one of the most well-known attack types. Malicious actors send emails to users impersonating a known brand, leverage social engineering tactics to create a heightened sense of immediacy and then lead people to click on a link or download an asset.",
      //         "rec_title": "Know what a phishing scam looks like",
      //         "rec_desc": "New phishing attack methods are being developed all the time, but they share commonalities that can be identified if you know what to look for. There are many sites online that will keep you informed of the latest phishing attacks and their key identifiers.",
      //         "simulation_id": 1
      //     },
      //     {
      //         "number": 2,
      //         "beh_gap_title": "HTTPS phishing",
      //         "beh_gap_desc": "The hypertext transfer protocol secure (HTTPS) is often considered a “safe” link to click because it uses encryption to increase security. Most legitimate organizations now use HTTPS instead of HTTP because it establishes legitimacy. However, cybercriminals are now leveraging HTTPS in the links that they put into phishing emails.",
      //         "rec_title": "Don’t click on that link",
      //         "rec_desc": "It’s generally not advisable to click on a link in an email or instant message, even if you know the sender. The bare minimum you should be doing is hovering over the link to see if the destination is the correct one. Some phishing attacks are fairly sophisticated, and the destination URL can look like a carbon copy of the genuine site, set up to record keystrokes or steal login/credit card information.",
      //         "simulation_id": 1
      //     }, . . .
      // ]
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log(
      "%cBULK UPSERT BEHAVIOURAL GAP SUCCESS !!!! ",
      "color: #2AC54D"
    );
    return result.data;
  } catch (err) {
    console.log("%cBULK UPSERT BEHAVIOURAL GAP ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const updateBehaviouralGap = async (behaviouralGapDetails) => {
  // ignore in postman
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.put(
      "/behaviouralGap/",
      behaviouralGapDetails,
      // Below are the Json Object structure for behaviouralGapDetails
      // {
      //   simulation_id: simulation_id, // Example Value : 2
      //   number: number, // Example Value : 2
      //   description: description, // Example Value : "Phishing awareness"
      // },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cUPDATE BEHAVIOURAL GAP SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cUPDATE BEHAVIOURAL GAP ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};

export const deleteBehaviouralGap = async (simulation_id, number) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(
      `/behaviouralGap/?simulation_id=${simulation_id}&number=${number}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    console.log("%cDELETE BEHAVIOURAL GAP SUCCESS !!!! ", "color: #2AC54D");
    return result.data;
  } catch (err) {
    console.log("%cDELETE BEHAVIOURAL GAP ERROR !!!! ", "color: #FF0000");
    console.log(JSON.stringify(err.message));
  }
};
