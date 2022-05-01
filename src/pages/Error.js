import React from "react";
import styles from "./Error.module.scss";
import {FaQuestionCircle} from "react-icons/fa";

const Error = ({errMessage}) => {
  return (
    <div className={styles["errorContainer"]}>
      <FaQuestionCircle className={styles["missing-icon"]} />
      <div className={styles["oops"]}>Oops!</div>
      <div className={styles["errorMsg"]}>
        We can't find the page you are looking for...
      </div>
    </div>
  );
};

export default Error;
