import React from "react";
import { useSelector } from "react-redux";
import styles from "./Toast.module.scss";

export default function Toast() {
  const toastMsg = useSelector((state) => state.general.toastMsg);
  const displayToast = useSelector((state) => state.general.displayToast);
  console.log(toastMsg);

  return (
    <div className={displayToast ? `${styles["toastBar"]} ${styles["toastBarShow"]}` : styles["toastBar"]}>
      {toastMsg}
    </div>
  )
}

