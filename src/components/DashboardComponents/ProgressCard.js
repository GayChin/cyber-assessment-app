import React from "react";
import styles from "./DashboardComponents.module.scss";

export const ProgressCard = ({text, number, directTo}) => {
  return (
    <button className={styles["progress-card"]} onClick={directTo}>
      <div className={styles["progress-title"]}>{text}</div>
      <div className={styles["progress-number"]}>{number}</div>
    </button>
  );
};