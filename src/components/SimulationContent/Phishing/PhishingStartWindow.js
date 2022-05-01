import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Phishing.module.scss";
import { GeneralButton } from "../../GeneralButton/GeneralButton";
import { useLocation } from "react-router-dom";
import {
  setDoneTutorial,
  // setInboxArr,
} from "../../../redux/simulationData/phishingData/phishingDataSlice.js";
// import Topic from "../../SimulationSidebar/Topic";
// import Simulation from "../../../pages/Simulation";
// import ProfileImage from "../../../images/profilepic.jpg";

// Background
import background from "./src/PhishingStartBackground.png";

const PhishingStartWindow = ({ startWithTimer, startWithoutTimer }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Call the backend API here to retrieve everything
  // const data = axios.get()
  // const dispatch = useDispatch()
  // dispatch(setInboxArr(data.inboxArr))
  // const inboxArr = useSelector((state)= > (state.phishingData.inboxArr))

  // const inboxArr = [
  //   {
  //     id: 0,
  //     sender: "Microsoft Outlook",
  //     senderEmail: "no-reply@microsoft.com",
  //     senderImg:
  //       "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
  //     receiver: "jefftheneverlandpirate@outlook.com",
  //     subject: "Welcome to Outlook",
  //     message:
  //       "Outlook helps you manage your life with powerful tools for email, calender, contacts and tasks.\nActivating collaborators are the people you have recently contacted through meetings, email, chats, and calls.\nIn Outlook you can select the contact to pin as important. Stay up to date with outstanding to-dos, unread emails, and more.\nLet's get start your journey with Microsoft Outlook.",
  //     time: "Wed 12:03PM",
  //     forwardMessage: false,
  //   },
  //   {
  //     id: 1,
  //     sender: "Security Team",
  //     senderEmail: "drsbx_security@outlook.com",
  //     senderImg:
  //       "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
  //     receiver: "jefftheneverlandpirate@outlook.com",
  //     subject: "How to report phishing email",
  //     message:
  //       "Please bookmark this email, so that you won't forget how to report a phishing email",
  //     time: "Wed 12:03PM",
  //     forwardMessage: false,
  //   },
  //   {
  //     id: 2,
  //     sender: "[COMPANY NAME]",
  //     // senderImg: ProfileImage,
  //     senderEmail: "[COMPANY NAME]@outlook.com",
  //     senderImg:
  //       "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
  //     receiver: "jefftheneverlandpirate@outlook.com",
  //     subject: "Onboarding information",
  //     message:
  //       "Welcome onboard, access the company's internal learning portal %%%%here%%%%",
  //     time: "Thu 12:03PM",
  //     forwardMessage: false,
  //   },
  //   {
  //     id: 3,
  //     sender: "Microsoft account team",
  //     senderEmail: "outlooo.teeam@outlook.com",
  //     senderImg:
  //       "data:image/jpeg;base64,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",
  //     receiver: "jefftheneverlandpirate@outlook.com",
  //     subject: "Introduction - Security team",
  //     message:
  //       "Dear outlook user,\nYou have some blocked incoming emails due to a recent maintenance.\n In order to rectify this problem, you are required to follow the below link to verify your account.\n Please click below link to unblock your inbox, it takes a few seconds\n%%%%VHVerify Your Account%%%%\nWe apologies for any inconvenience and appreciate your understanding.\nThanks.\nThe Microsoft account team",
  //     time: "Thu 12:08PM",
  //     forwardMessage: false,
  //   },
  //   {
  //     id: 4,
  //     sender: "Your colleague",
  //     senderEmail: "colleague@outlook.com",
  //     senderImg:
  //       "data:image/jpeg;base64,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",
  //     receiver: "jefftheneverlandpirate@outlook.com",
  //     subject: "SOS!! Is this a phishing email?",
  //     message: "Hi Jeff, can you help me to check if this a phishing email?",
  //     time: "Fri 12:08PM",
  //     forwardMessage: true,
  //   },
  //   {
  //     id: 5,
  //     sender: "Dropbox Supports",
  //     senderEmail: "no-reply@dr0pbox.com",
  //     senderImg:
  //       "data:image/jpeg;base64,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",
  //     receiver: "jefftheneverlandpirate@outlook.com",
  //     subject: "Reset Your Password",
  //     message:
  //       "Hi there,\n John Taylor(john@gmail.com) invited you to view the folder 'Ways to become better at work' on Dr0pbox. \n%%%%Go to folder%%%%\n\nEnjoy!\nThe Dr0pbox Team",
  //     time: "Fri 12:10PM",
  //     forwardMessage: false,
  //   },
  // ];

  // useEffect(() => {
  //   dispatch(setInboxArr(inboxArr));
  // });

  // Store all the backend data to a redux store
  // We need to pass 2 separate start props, startWithTimer and startWithoutTimer

  let doneTutorial = useSelector((state) => state.phishingData.doneTutorial);

  dispatch(setDoneTutorial(false));

  // Before fetching from backend, we don't have an actual value for DoneTutorial
  // If doneTutorial is true, then we won't run the phishingOverlay
  // If doneTutorial is false, we will run phishing overlay but the doneTutorial value will be permanently false if we don't update it
  // So we update doneTutorial in phishingOverlay as well
  // If doneTutorial(retrieve from backend) is false, then we use StartWithoutTimer
  // if doneTutorial is true, then we startWithTimer

  return (
    // phishingCompletionStatus
    <div>
      <div className={styles["start-window-container"]}>
        <img src={background} alt="Phishing Starting Screen" />
        <div className={styles["phishing-start-prompt"]}>
          Welcome! This is your first day at work. You have just activated your
          email account. In your Inbox, you will see some important onboarding
          emails. Please spend a few minutes to go through the emails.
          <div className={styles["phishing-start-button"]}>
            <GeneralButton
              text={`Start`}
              buttonStyle="btn-medium-state-blue"
              buttonSize="btn-small"
              onClick={() =>
                doneTutorial
                  ? startWithTimer(location)
                  : startWithoutTimer(location)
              }
              // if(doneTutorial == true then startwithtimer else startWithoput)start(location)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingStartWindow;
