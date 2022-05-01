import {axiosInstance} from "../axiosInstance.js";
import {store} from "../../redux/store.js";

export const getSimulationPhishingEmail = async () => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.get(`/simPhishingEmail/`, {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.log(
      "%cLIST SIMULATION PHISHING EMAIL ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};

export const bulkUpsertSimulationPhishingEmail = async (
  simPhishingEmailList
) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.post(
      `/simPhishingEmail/`,
      simPhishingEmailList,
      // Below are the Json Object structure for simPhishingEmailList
      // [
      //   {
      //     email_id: 1,
      //     sender_img_base64:
      //       "data:image/jpeg;base64, . . .
      //     sender_name: "Microsoft Outlook",
      //     sender_email_addr: "no-reply@microsoft.com",
      //     subject: "Welcome to Outlook",
      //     message:
      //       "Outlook helps you manage your life with powerful tools for email, calender, contacts and tasks.\nActivating collaborators are the people you have recently contacted through meetings, email, chats, and calls.\nIn Outlook you can select the contact to pin as important. Stay up to date with outstanding to-dos, unread emails, and more.\nLet's get start your journey with Microsoft Outlook.",
      //     is_forward_message: false,
      //     incoming_duration: 0,
      //     order: 0,
      //   },
      //   {
      //     email_id: 2,
      //     sender_img_base64:
      //       "data:image/jpeg;base64, . . .
      //     sender_name: "Security Team",
      //     sender_email_addr: "drsbx_security@outlook.com",
      //     subject: "How to report phishing email",
      //     message:
      //       "Please bookmark this email, so that you won't forget how to report a phishing email",
      //     is_forward_message: false,
      //     incoming_duration: 0,
      //     order: 1,
      //   },
      //   {
      //     email_id: 3,
      //     sender_img_base64:
      //       "data:image/jpeg;base64, . . .
      //     sender_name: "[COMPANY NAME]",
      //     sender_email_addr: "[COMPANY NAME]@outlook.com",
      //     subject: "Onboarding information",
      //     message:
      //       "Welcome onboard, access the company's internal learning portal %%%%here%%%%",
      //     is_forward_message: false,
      //     incoming_duration: 0,
      //     order: 2,
      //   }, . . . . . . . . .
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
      "%cBULK UPSERT SIMULATION PHISHING EMAIL ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};

export const updateSimulationPhishingEmailSenderImg = async (
  emailId,
  senderImg
) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.put(
      `/simPhishingEmail/`,
      emailId,
      senderImg,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(
      "%cUPDATE SIMULATION PHISHING EMAIL SENDER IMAGE ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};

export const deleteSimulationPhishingEmail = async (emailId) => {
  try {
    const access_token = store.getState().user.user.access_token;
    const result = await axiosInstance.delete(
      `/simPhishingEmail/?email_id=${emailId}`,
      {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(
      "%cDELETE SIMULATION PHISHING EMAIL ERROR *********",
      "color: #FF0000"
    );
    console.log(JSON.stringify(err.message));
  }
};
