import React from "react";

import styles from "./Phishing.module.scss";

const UrlStatus = (props) => {
  const secure = props.secure ? "secure" : "insecure";
  return (
    <div className={styles["statusContainer"]}>
      <div className={`${styles["statusSummary"]} ${styles[secure]}`}>
        {props.secure
          ? "Connection is secure"
          : "Your connection to this site is not secure"}
      </div>
      <p>
        {props.secure
          ? "Your information (for example, passwords or credit card numbers) is private when it is sent to this site"
          : `You should not enter any sensitive information on this site (for example, passwords or credit cards), 
                because it could be stolen by attackers`}
      </p>
    </div>
  );
};
export default UrlStatus;
