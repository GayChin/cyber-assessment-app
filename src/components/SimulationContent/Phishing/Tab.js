import React from "react";
import styles from "./Phishing.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectTab,setTab} from "../../../redux/simulationData/phishingData/phishingDataSlice";

const Tab = (props) => {

  const tabArr = useSelector((state) => state.phishingData.tabArr)
  const dispatch = useDispatch();
  

  function removeTab2AndChangeStyle() {
    const filtered = tabArr.filter((tab) => {
      return tab.tab_name !== "Tab2"
    });
    console.log("filtered tab : ", filtered[filtered.length-1].tab_name)
    dispatch(setTab(filtered));
    console.log("remove tab 2 triggered here?")
    dispatch(selectTab(filtered[filtered.length-1].tab_name));
  }
  function removeTab3AndChangeStyle() {
    const filtered = tabArr.filter((tab) => {
      return tab.tab_name !== "Tab3"
    });
    console.log("filtered tab : ", filtered[filtered.length-1].tab_name)
    dispatch(setTab(filtered));
    console.log("remove tab 3 triggered here?")
    dispatch(selectTab(filtered[filtered.length-1].tab_name));
  }
  
  function selectTabFunc() {
    dispatch(selectTab(`${props.name}`))
    console.log("\naaaa")
  }
  return (
    <div
      className={styles[`${props.selectedTabClassName}`]}
      onMouseDown={() => {selectTabFunc()}}
    >
      <div>
        <img className={styles["tabImg"]} src={props.img} alt="tabImg" />
        {props.name}
      </div>
      {props.name === "Tab2" || props.name === "Tab3" ? (
        <button
          className={styles["close-tab-btn"]}
          onClick={props.name === "Tab2" ? () => removeTab2AndChangeStyle() : () => removeTab3AndChangeStyle()}
        >
          &times;
        </button>
      ) : (
        <button
          className={styles["close-tab-btn"]}
          onClick={() => {
            alert("Sorry, the simulation tab cannot be closed!");
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Tab;
