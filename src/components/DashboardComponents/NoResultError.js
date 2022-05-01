import React from "react";
import styles from "./DashboardComponents.module.scss";
import {GiMeshNetwork} from "react-icons/gi";
import {useHistory} from "react-router-dom";
import {GeneralButton} from "../GeneralButton/GeneralButton";

export const NoResultError = ({errMessage}) => {
  const history = useHistory();
  async function redirectSimulation() {
    history.push("modules/1/simulation/phishing");
  }
  return (
    <div className={styles["errorContainer"]}>
      <GiMeshNetwork className={styles["missing-icon"]} />
      <div className={styles["errorMsg"]}>
        {errMessage}
      </div>
      <div>
        <br />
      </div>
      <GeneralButton
        text={"Bring me there"}
        buttonSize="btn-small"
        onClick={() => redirectSimulation()}
      />
      <div>
        <br />
        <br />
      </div>
    </div>
  );
};
