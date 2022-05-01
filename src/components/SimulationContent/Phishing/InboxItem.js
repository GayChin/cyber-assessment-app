import React from "react";
import styles from "./Phishing.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  addMarkedAsReadContent,
  selectInbox,
  addSelectedBeforeInboxList,
  setIncomingEmail,
  addEmail,
  setDoneTutorial,
  setTutorialIdx
} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import { setNextInboxAppearanceTiming } from "../../../redux/simulationData/phishingData/phishingDataSlice";

const InboxItem = (props) => {
  const { id, sender, subject, message, time } = props;
  const dispatch = useDispatch();
  const  tutorialId = useSelector((state) => state.phishingData.tutorialIdx)
  const inboxSelected = useSelector(
    (state) => state.phishingData.inboxSelected
  );
  const bookmarkList = useSelector((state) => state.phishingData.bookmarkList);
  const markedAsReadList = useSelector(
    (state) => state.phishingData.markedAsReadList
  );
  const selectedBeforeInboxList = useSelector(
    (state) => state.phishingData.selectedBeforeInboxList
  );
  // An array that store the list of mails showns on the inbox list, the mails will be pushed
  // in from the inboxArr when a specified time has passed or the user triggers it
  const inboxTimedArr = useSelector(
    (state) => state.phishingData.inboxTimedArr
  );
  // An array that store all the mails that will be pushed into the inboxTimedArr
  const inboxArr = useSelector((state) => state.phishingData.inboxArr);
  //note: added by 1 already
  const email3 = inboxTimedArr.find((inbox) => inbox.email_id === 3);
  const email4 = inboxTimedArr.find((inbox) => inbox.email_id === 4);
  const email5 = inboxTimedArr.find((inbox) => inbox.email_id === 5);
  const email6 = inboxTimedArr.find((inbox) => inbox.email_id === 6);
  // useEffect(() => {
  //   console.log("inboxSelected : ", inboxSelected);
  // }, [inboxSelected]);

  const remainingTime = useSelector(
    (state) => state.timer.phishingRemainingTime
  );

  // TODO: when inbox item is clicked inboxTimedArr only two things, is fixed and
  function selectInboxAndSetRead(id) {
    if (inboxSelected !== id) {
      dispatch(selectInbox(id));
      console.log("email id >>>>>>", id);
      dispatch(addMarkedAsReadContent(id));
      dispatch(addSelectedBeforeInboxList(id));
    }
  }

  return (
    <div
      className={
        inboxSelected === id
          ? `${styles["selected-inbox-item-container"]} ${
              bookmarkList.includes(id) ? styles["inbox-item-bookmarked"] : null
            }`
          : `${styles["inbox-item-container"]} ${
              bookmarkList.includes(id) ? styles["inbox-item-bookmarked"] : null
            }`
      }
      onClick={() => selectInboxAndSetRead(id)}
    >
      <div
        className={
          markedAsReadList.includes(id)
            ? styles["read-status"]
            : styles["unread-status"]
        }
      ></div>
      <div className={styles["inbox-item-content"]}>
        <div className={styles["sender"]}>{sender}</div>
        <div className={styles["subject"]}>
          <div
            className={
              markedAsReadList.includes(id) ? styles["read"] : styles["unread"]
            }
            style={{ fontWeight: "bold" }}
          >
            {subject}
          </div>
          <div>{time}</div>
        </div>
        <div className={styles["message"]}>{`${message}`}</div>
      </div>
    </div>
  );
};

export default InboxItem;
