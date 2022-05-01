import React from "react";
import styles from "./DashboardComponents.module.scss";
import {useHistory} from "react-router-dom";

export const ImprovementCard = ({title, text, url}) => {
  const history = useHistory();

  function directLearnMore() {
    // go to url
    // history.push(url);
  }
  return (
    <div className={styles["improvement-card"]}>
      <div className={styles["improvement-title"]}>{title}</div>
      <div className={styles["improvement-text"]}>{text}</div>

      <button className={styles["gradient-btn"]} onClick={directLearnMore}>
        Learn more
      </button>
    </div>
  );
};
