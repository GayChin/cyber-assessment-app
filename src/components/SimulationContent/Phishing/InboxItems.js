import React from "react";
import InboxItem from "./InboxItem";
import styles from "./Phishing.module.scss";
import { getInboxItemDateTime } from "../../../utilities/getCurrentDate";

const InboxItems = (props) => {
  const reversedArray = [...props.inboxTimedArr].reverse();
  
  return (
    <div className={styles["inbox-items-container"]}>
      {reversedArray.map((mail) => (
        <InboxItem
          key={mail.email_id}
          sender={mail.sender_name}
          subject={mail.subject}
          message={mail.message}
          time={mail.received_time === 0 ? getInboxItemDateTime(Math.trunc(Date.now()/1000)) : getInboxItemDateTime(mail.received_time)}
          id={mail.email_id}
        />
      ))}
    </div>
  );
};
export default InboxItems;
