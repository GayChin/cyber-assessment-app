import React from "react";
import styles from "./Phishing.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectOutlookSidebarItem} from "../../../redux/outlookSidebar/outlookSidebarSlice";

const OutlookSideBarItem = (props) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state) => state.outlookSidebar.outlookSidebarItemSelected
  );
  return (
    <div
      className={
        selectedItem === props.name
          ? styles["selected-outlook-sidebar-item"]
          : styles["outlook-sidebar-item"]
      }
      onClick={() => dispatch(selectOutlookSidebarItem(`${props.name}`))}
      style={{pointerEvents: props.name === "Deleted Items" ? "none" : "auto"}}
    >
      <props.icon className={styles["simulationSideBarItemIcon"]} />
      <span className={styles["outlook-sidebar-item-name"]}>{props.name}</span>
      {props.numberOfMails !== 0 ? (
        <span className={styles["outlook-sidebar-item-count"]}>
          {props.numberOfMails}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OutlookSideBarItem;
