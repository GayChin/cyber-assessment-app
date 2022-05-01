import React from "react";
import {useSelector, useDispatch} from "react-redux";
import styles from "./Phishing.module.scss";
import {setIncomingEmail} from "../../../redux/simulationData/phishingData/phishingDataSlice";
const IncomingMail = (props) => {
  const dispatch = useDispatch();
  const incomingMail = useSelector((state) => state.phishingData.incomingEmail);
  return (
    <>
      {incomingMail === true ? (
        <div className={styles["incoming-mail-container"]}>
          <div className={styles["unread-status"]}></div>
          <div className={styles["inbox-item-content"]}>
            <div className={styles["incoming-title"]}>New incoming email</div>
            <div className={styles["incoming-msg"]}>
              You have a new email. Please take a look.
            </div>
          </div>
          <button onClick={() => dispatch(setIncomingEmail(false))}>
            &times;
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default IncomingMail;
